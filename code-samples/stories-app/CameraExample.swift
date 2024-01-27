CameraPreviewView(cameraController)
    .overlay(
        FocusIndicatorView { location in
            cameraController.focusAndExposeTap(location)
        }
    )
    .zoomDragGesture { zoomPercentage in
        cameraController.adjustZoomByPercentage(zoomPercentage)
    }
    .zoomPinchGesture { zoomPercentage in
        cameraController.adjustZoomByPercentage(zoomPercentage)
    }