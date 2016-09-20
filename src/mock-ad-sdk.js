// Mock an ad SDK library
// Expects that contentElement is HTML5 video element

export default function(contentElement, adContainer, finishedCb) {
  let prevSrc = contentElement.src

  let endListener = () => {
    contentElement.removeEventListener('ended', endListener)
    contentElement.src = prevSrc
    contentElement.load()
    finishedCb()
  }

  // 'small.mp4' source is http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5
  contentElement.src = 'small.mp4'
  contentElement.load()
  contentElement.addEventListener('ended', endListener)
  contentElement.play()
}
