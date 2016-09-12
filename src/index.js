import {UICorePlugin, Events, $} from 'clappr'
import './style.sass'
import {MOCK_MP4} from './mock-mp4'
import playSvg from './play.svg'
import posterSvg from './poster.svg'

export default class Html5PrerollPlugin extends UICorePlugin {
  get name() { return 'html5-preroll-plugin' }

  get attributes() {
    return {
      'class': this.name,
      'data-preroll': ''
    }
  }

  constructor(core) {
    super(core)

    console.log('plugin configuration', this.options.html5PrerollPlugin)
    this._forceOverlay = this.options.html5PrerollPlugin.forceOverlay === true
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this._onMediaControlContainerChanged)
    this.listenTo(this.core, Events.CORE_READY, this._onCoreReady)
  }

  _onMediaControlContainerChanged() {
    this.core.mediaControl.container.$el.append(this.el)
  }

  _onCoreReady() {
    // Attempt to get poster plugin
    this._posterPlugin =  this.core.mediaControl
      && this.core.mediaControl.container
      && this.core.mediaControl.container.getPlugin('poster')

    if (!this._posterPlugin) {
      throw new Error('Failed to get Clappr internal poster plugin')
    }

    // Attempt to get click-to-pause plugin
    this._clickToPausePlugin =  this.core.mediaControl
      && this.core.mediaControl.container
      && this.core.mediaControl.container.getPlugin('click_to_pause')

    if (!this._clickToPausePlugin) {
      throw new Error('Failed to get Clappr internal click-to-pause plugin')
    }

    this._createAdPlayer()
  }

  _disableControls() {
    if (this._posterPlugin) {
      this._posterPlugin.container.disableMediaControl()
      this._posterPlugin.disable()
    }
    if (this._clickToPausePlugin) {
      this._clickToPausePlugin.disable()
    }
  }

  _enableControls() {
    if (this._posterPlugin) {
      this._posterPlugin.container.enableMediaControl()
      this._posterPlugin.enable()
    }
    if (this._clickToPausePlugin) {
      this._clickToPausePlugin.enable()
    }
  }

  _createAdPlayer() {
    // Attempt to get playback
    this._playback = this.core.mediaControl
      && this.core.mediaControl.container
      && this.core.mediaControl.container.playback

    if (!this._playback) {
      throw new Error('Failed to get Clappr playback')
    }

    // Ensure browser can play video content
    if (this._playback.name === 'no_op') {
      return
    }

    // For example, this is Google IMA HTML5 SDK requirements
    let contentElement = this._playback.el
    let adContainer = this._adContainer

    process.nextTick(() => this._disableControls())

    this._videoMock = false
    this._videoPoster = false

    if (this._playback.tagName === 'video') {
      let src = this._playback.el && this._playback.el.src
      if (!src || src.length === 0) {
        // Ensure video element has one source loaded
        this._playback.el.src = MOCK_MP4
        this._videoMock = true
      } else if (this._playback.name === 'html5_video' && !this._playback.el.hasAttribute('poster'))  {
        // Hide video source preview using a black 1 pixel video poster (smoother user experience)
        this._playback.el.poster = 'data:image/svg+xml,' + posterSvg
        this._videoPoster = true
      }
    }

    // Ad start must be done as the result of a user action on mobile
    // Assume that device that support touch can't autostart campaign (may be wrong in some cases !)
    if (this._forceOverlay || 'ontouchstart' in window) {
      let startAd = (e) => {
        try {
          this._clickOverlay.removeEventListener('click', startAd, false)
          e.preventDefault()
          e.stopPropagation()
        } catch (err) {}
        this._clickOverlay.style.display = 'none'
        this._playVideoAd()
      }

      // Display click overlay
      this._clickOverlay.addEventListener('click', startAd, false)
      this._clickOverlay.style.display = 'block'

      return
    }

    // (auto)start preroll video ad
    this._playVideoAd()
  }

  _playVideoAd() {
    // At this state, you can pass contentElement and adContainer to AD library
    // On mobile device, it directly use contentElement (html5 video) to play video ad
    console.log('Your content in 3 seconds...')

    // Asynchronous mock (3 seconds)
    setTimeout(() => {
      // And finally, when ad has finished, play the content
      this._playVideoContent()
    }, 3000)
  }

  _playVideoContent() {
    if (this._videoPoster === true) {
      this._playback.$el.attr('poster', null)
    }

    if (this._videoMock === true) {
      this._playback.el.src = ""
      // Reset <video> using playback stop() method
      // Known issue: Poster may briefly appear on some devices
      this._playback.stop()
    }

    process.nextTick(() => {
      this._enableControls()
      this.core.mediaControl.play()
      // this.destroy()
      console.log('that\'s it folks!')
    })
  }

  _remove() {
    if (this._$adContainer) {
      this._$adContainer.remove()
    }
    if (this._$clickOverlay) {
      this._$clickOverlay.remove()
    }
  }

  render() {
    this._remove()
    this._$adContainer = $("<div />").addClass("preroll-container").attr('data-preroll', '')
    this._$clickOverlay = $("<div />").addClass("preroll-overlay").attr('data-preroll', '')
    this._$clickOverlay.append(playSvg).find('svg path').css('fill', '#fff')
    this._$clickOverlay.find('svg').addClass('preroll-overlay-icon').attr('data-preroll', '')
    this.$el.append(this._$adContainer)
    this.$el.append(this._$clickOverlay)
    this._adContainer = this._$adContainer[0]
    this._clickOverlay = this._$clickOverlay[0]

    return this
  }

  destroy() {
    // here destroy ad needless stuff ?
    super.destroy()
  }
}
