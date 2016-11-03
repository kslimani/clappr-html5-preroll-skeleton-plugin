import {UICorePlugin, Events, Browser, Styler, $} from 'clappr'
import pluginStyle from './style.sass'
import {MOCK_MP4} from './mock-mp4'
import playSvg from './play.svg'
import posterSvg from './poster.svg'
import mockAdSdk from './mock-ad-sdk'

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

  _pluginError(msg) {
    throw new Error(this.name + ': ' + msg)
  }

  _onCoreReady() {
    // Get current container (to disable bindings during ad playback)
    this._container = this.core.getCurrentContainer()
    if (!this._container) {
      this._pluginError('Failed to get Clappr current container')
    }

    // Get current playback (to get player element)
    this._playback = this.core.getCurrentPlayback()
    if (!this._playback) {
      this._pluginError('Failed to get Clappr playback')
    }

    // Get poster plugin. (May interfere with media control)
    this._posterPlugin = this._container.getPlugin('poster')
    if (!this._posterPlugin) {
      this._pluginError('Failed to get Clappr internal poster plugin')
    }

    // Get click-to-pause plugin (May interfere with advert click handling)
    this._clickToPausePlugin = this._container.getPlugin('click_to_pause')
    if (!this._clickToPausePlugin) {
      this._pluginError('Failed to get Clappr internal click-to-pause plugin')
    }

    this._contentElement = this._playback.el
    this._createAdPlayer()
  }

  _disableControls() {
    this.core.disableMediaControl()
    this._posterPlugin.disable()
    this._clickToPausePlugin.disable()
    this._container.stopped() // Little trick to avoid spinner plugin display
    this._container.stopListening()
  }

  _enableControls() {
    this._container.bindEvents()
    this._clickToPausePlugin.enable()
    this._posterPlugin.enable()
    this.core.enableMediaControl()
    this.core.mediaControl.onLoadedMetadataOnVideoTag(); // Little trick to fix iOS fullscreen button display
  }

  _createAdPlayer() {
    // Ensure browser can play video content
    if (this._playback.name === 'no_op') {
      return
    }

    process.nextTick(() => this._disableControls())

    this._videoMock = false
    this._videoPoster = false

    if (this._playback.tagName === 'video') {
      let src = this._playback.el && this._playback.el.src
      if (!src || src.length === 0) {
        // Ensure video element has one source loaded (expected by most of ad SDK libraries)
        this._playback.el.src = MOCK_MP4
        this._videoMock = true
      } else if (this._playback.name === 'html5_video' && !this._playback.el.hasAttribute('poster'))  {
        // Hide video source preview using a black 1 pixel video poster (smoother user experience)
        this._playback.el.poster = 'data:image/svg+xml,' + posterSvg
        this._videoPoster = true
      }
    }

    // Ad start must be done as the result of a user action on mobile
    if (this._forceOverlay || Browser.isMobile) {
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
    // At this state, you can pass "contentElement" and "adContainer" to ad library
    // On mobile device, it directly use contentElement (html5 video) to play video ad
    // For example, "contentElement" and "adContainer" are Google IMA HTML5 SDK requirements
    mockAdSdk(this._contentElement, this._adContainer, () => this._playVideoContent())
  }

  _playVideoContent() {
    if (this._videoPoster === true) {
      this._playback.$el.attr('poster', null)
    }

    if (this._videoMock === true) {
      this._playback.el.src = ""
      // Reset <video> using stop() method
      // Known issue: Poster may briefly appear on some devices
      this.core.mediaControl.stop()
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
    this.$el.append(Styler.getStyleFor(pluginStyle))
    this._adContainer = this._$adContainer[0]
    this._clickOverlay = this._$clickOverlay[0]

    return this
  }

  destroy() {
    // here destroy ad needless stuff ?
    super.destroy()
  }
}
