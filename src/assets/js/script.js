(function(window, document) {
    var saveGIFButton = document.querySelector('#save-gif');
    var downloadAttrSupported = ('download' in document.createElement('a'));
    var createGIFButton = document.querySelector('#create-gif');
    var gifSource = document.querySelector('#GIFSource');
    var gifType = document.querySelector('#GIFType');
    var interval = document.querySelector("#interval");
    var numFrames = document.querySelector("#numFrames");
    var frameDuration = document.querySelector("#frameDuration");
    var gifHeight = document.querySelector("#gifHeight");
    var gifWidth = document.querySelector("#gifWidth");
    var progressBar = document.querySelector("progress");
    var text = document.querySelector('#gifText');
    var fontWeight = document.querySelector('#fontWeight');
    var fontSize = document.querySelector('#fontSize');
    var fontFamily = document.querySelector('#fontFamily');
    var fontColor = document.querySelector('#fontColor');
    var textAlign = document.querySelector('#textAlign');
    var textBaseline = document.querySelector('#textBaseline');
    var sampleInterval = document.querySelector('#sampleInterval');
    var numWorkers = document.querySelector('#numWorkers');
    var gifshotImagePreview = document.querySelector('.gifshot-image-preview-section');
    var placeholderDiv = document.querySelector('.placeholder-div');
    var placeholderDivDimensions = document.querySelector('.placeholder-div-dimensions');
    var gifshotCode = document.querySelector('.gifshot-code');
    var gifshotCodeTemplate = document.querySelector('.gifshot-code-template');
    var getSelectedOptions = function () {
        return {
            gifWidth: Number(gifWidth.value),
            gifHeight: Number(gifHeight.value),
            images: gifSource.value === 'images' ? ['http://i.imgur.com/2OO33vX.png', 'http://i.imgur.com/qOwVaSN.png', 'http://i.imgur.com/Vo5mFZJ.gif'] : false,
            video: gifSource.value === 'video' ? ['example.mp4', 'example.ogv'] : false,
            interval: Number(interval.value),
            numFrames: Number(numFrames.value),
            frameDuration: Number(frameDuration.value),
            text: text.value,
            fontWeight: fontWeight.value,
            fontSize: fontSize.value + 'px',
            fontFamily: fontFamily.value,
            fontColor: fontColor.value,
            textAlign: textAlign.value,
            textBaseline: textBaseline.value,
            sampleInterval: Number(sampleInterval.value),
            numWorkers: Number(numWorkers.value)
        }
    };
    var passedOptions;
    var updateCodeBlock = function (obj) {
      obj = obj || {};

      var targetElem = obj.targetElem;
      var selectedOptions = getSelectedOptions();
      var options = (function() {
          var obj = {};

          _.each(selectedOptions, function(val, key) {
              if (val) {
                obj[key] = val;
              }
          });

          return obj;
      }());
      var template = _.template(gifshotCodeTemplate.innerHTML, {
          gifshot: window.gifshot,
          selectedOptions: options,
          method: gifType.value === 'snapshot' ? 'takeSnapShot' : 'createGIF'
      });
      var code = escodegen.generate(esprima.parse(template), {
          format: {
              safeConcatenation: true
          }
      });

      gifshotCode.innerHTML = code;

      Prism.highlightElement(gifshotCode);

      if (targetElem && (targetElem.id === 'gifWidth' || targetElem.id === 'gifHeight')) {
          if (selectedOptions.gifHeight && selectedOptions.gifWidth) {
              gifshotImagePreview.innerHTML = '';
              placeholderDiv.style.height = selectedOptions.gifHeight + 'px';
              placeholderDiv.style.width = selectedOptions.gifWidth + 'px';
              placeholderDivDimensions.innerHTML = selectedOptions.gifWidth + ' x ' + selectedOptions.gifHeight;

              if (selectedOptions.gifWidth < 60 || selectedOptions.gifHeight < 20) {
                  placeholderDivDimensions.classList.add('hidden');
              } else {
                  placeholderDivDimensions.classList.remove('hidden');
              }

              placeholderDiv.classList.remove('hidden');
          } else {
              placeholderDiv.classList.add('hidden');
          }
      }
    };
    var bindEvents = function () {
        createGIFButton.addEventListener('click', function (e) {
            e.preventDefault();

            passedOptions = _.merge(_.clone(getSelectedOptions()), {
                progressCallback: function (captureProgress) {
                    gifshotImagePreview.innerHTML = '';
                    placeholderDiv.classList.add('hidden');
                    progressBar.classList.remove('hidden');
                    progressBar.value = captureProgress;
                }
            });

            var method = gifType.value === 'snapshot' ? 'takeSnapShot' : 'createGIF';

            gifshot[method](passedOptions, function(obj) {
                if (!obj.error) {
                    var image = obj.image;
                    var animatedImage = document.createElement('img');

                    animatedImage.src = image;

                    progressBar.classList.add('hidden');
                    progressBar.value = 0;

                    placeholderDiv.classList.add('hidden');
                    gifshotImagePreview.innerHTML = '';
                    gifshotImagePreview.appendChild(animatedImage);

                    if (downloadAttrSupported) {
                        saveGIFButton.setAttribute('href', image);
                        saveGIFButton.classList.remove('hidden');
                    }
                } else {
                    console.log('obj.error', obj.error);
                    console.log('obj.errorCode', obj.errorCode);
                    console.log('obj.errorMsg', obj.errorMsg);
                }
            });
        }, false);

        saveGIFButton.addEventListener('click', function (e) {
            e.preventDefault();

            window.open(saveGIFButton.getAttribute('href'));

        }, false);

        document.addEventListener('change', function (e) {
            updateCodeBlock({
                targetElem: e.target
            });
        });

        document.addEventListener('keyup', function (e) {
            updateCodeBlock({
                targetElem: e.target
            });
        });
    };

    bindEvents();
    updateCodeBlock({
        targetElem: gifWidth
    });
}(window, document));


var option = {
    // Desired width of the image
    gifWidth: 200,
    // Desired height of the image
    gifHeight: 200,
    // If this option is used, then a GIF will be created using these images
    // e.g. [http://i.imgur.com/2OO33vX.jpg, http://i.imgur.com/qOwVaSN.png, http://i.imgur.com/Vo5mFZJ.gif],
    // Note: Make sure these image resources are CORS enabled to prevent any cross-origin JavaScript errors
    // Note: You may also pass a NodeList of existing image elements on the page
    images: [],
    // If this option is used, then a gif will be created using the appropriate video
    // HTML5 video that you would like to create your animated GIF from
    // Note: Browser support for certain video codecs is checked, and the appropriate video is selected
    // Note: You may also pass a NodeList of existing video elements on the page
    // e.g. video: [example.mp4, example.ogv],
    video: null,
    // You can pass an existing video element to use for the webcam GIF creation process,
    // and this video element will not be hidden (useful when used with the keepCameraOn option)
    // Pro tip: Set the height and width of the video element to the same values as your future GIF
    // Another Pro Tip: If you use this option, the video will not be paused, the object url not revoked, and
    // the video will not be removed from the DOM.  You will need to handle this yourself.
    webcamVideoElement: null,
    // Whether or not you would like the users camera to stay on after the GIF is created
    // Note: The cameraStream Media object is passed back to you in the createGIF() callback function
    keepCameraOn: false,
    // Expects a cameraStream Media object
    // Note: Passing an existing camera stream will allow you to create another GIF and/or snapshot without
    //	asking for the users permission to access the camera again if you are not using SSL
    cameraStream: null,
    // The amount of time (in seconds) to wait between each frame capture
    interval: 0.1,
    // The number of frames to use to create the animated GIF
    // Note: Each frame is captured every 100 milleseconds of a video and every ms for existing images
    numFrames: 10,
    // The amount of time (10 = 1s) to stay on each frame
    frameDuration: 1,
    /*  */
        // The text that covers the animated GIF
        text: '',
        // The font weight of the text that covers the animated GIF
        fontWeight: 'normal',
        // The font size of the text that covers the animated GIF
        fontSize: '16px',
        // The minimum font size of the text that covers the animated GIF
        // Note: This option is only applied if the text being applied is cut off
        minFontSize: '10px',
        // Whether or not the animated GIF text will be resized to fit within the GIF container
        resizeFont: false,
        // The font family of the text that covers the animated GIF
        fontFamily: 'sans-serif',
        // The font color of the text that covers the animated GIF
        fontColor: '#ffffff',
        // The horizontal text alignment of the text that covers the animated GIF
        textAlign: center,
        // The vertical text alignment of the text that covers the animated GIF
        textBaseline: bottom,
        // The X (horizontal) Coordinate of the text that covers the animated GIF (only use this if the default textAlign and textBaseline options dont work for you)
        textXCoordinate: null,
        // The Y (vertical) Coordinate of the text that covers the animated GIF (only use this if the default textAlign and textBaseline options dont work for you)
        textYCoordinate: null,
    /*  */
    // Callback function that provides the current progress of the current image
    progressCallback: function(captureProgress) {},
    // Callback function that is called when the current image is completed
    completeCallback: function() {},
    // how many pixels to skip when creating the palette. Default is 10. Less is better, but slower.
    // Note: By adjusting the sample interval, you can either produce extremely high-quality images slowly, or produce good images in reasonable times.
    // With a sampleInterval of 1, the entire image is used in the learning phase, while with an interval of 10,
    // a pseudo-random subset of 1/10 of the pixels are used in the learning phase. A sampling factor of 10 gives a
    // substantial speed-up, with a small quality penalty.
    sampleInterval: 10,
    // how many web workers to use to process the animated GIF frames. Default is 2.
    numWorkers: 2,
    // Whether or not you would like to save all of the canvas image binary data from your created GIF
    // Note: This is particularly useful for when you want to re-use a GIF to add text to later
    saveRenderingContexts: false,
    // Expects an array of canvas image data
    // Note: If you set the saveRenderingContexts option to true, then you get the savedRenderingContexts
    //	in the createGIF callback function
    savedRenderingContexts: [],
    // When existing images or videos are requested used, we set a CORS attribute on the request.
    // Options are Anonymous, use-credentials, or a falsy value (like ) to not set a CORS attribute.
    crossOrigin: Anonymous
}