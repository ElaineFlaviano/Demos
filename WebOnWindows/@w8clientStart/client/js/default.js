﻿// For an introduction to the Fixed Layout template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232508
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
            } else {
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };


    app.onsettings = function (e) {

        e.detail.applicationcommands = {
            "about": {
                href: "/pages/settings/aboutflyout.html",
                title: "not about"
            },
            "help": {
                href: "/pages/settings/helpFlyout.html",
                title: "Help"
            }
        }

        WinJS.UI.SettingsFlyout.populateSettings(e);
    };

    app.onloaded = function () {

        document.querySelector("#picture").addEventListener("click", imageCapture);

        WinJS.xhr({
            url: "http://www.thatConference.com/odata/api.svc/People",
            headers: { accept: "application/json" }

        }).then(
            function (args) {
                var obj = JSON.parse(args.responseText);
                ko.applyBindings(obj);
            },
            function (args) {
                //error
            });
    }



    function imageCapture() {
        var _capture = Windows.Media.Capture;

        var captureUI = new _capture.CameraCaptureUI();

        captureUI.photoSettings.format = _capture.CameraCaptureUIPhotoFormat.png;
        captureUI.photoSettings.croppedAspectRatio = { height: 4, width: 3 };

        captureUI.captureFileAsync(_capture.CameraCaptureUIMode.photo)
            .then(function (capturedItem) {
                if (capturedItem) {

                    var photoBlobUrl = URL.createObjectURL(
                        capturedItem,
                        { oneTimeOnly: true });

                    var imageElement = document.createElement("img");
                    imageElement.setAttribute("src", photoBlobUrl);

                    document.querySelector(".pic").appendChild(imageElement);
                }
            });
    }



    app.start();
})();
