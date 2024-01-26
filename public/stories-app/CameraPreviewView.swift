import SwiftUI
import AVFoundation

struct CameraPreviewView: UIViewRepresentable {
    private let controller: CameraController

    init(_ controller: CameraController) {
        self.controller = controller
    }

    func makeUIView(context: Context) -> VideoPreviewView {
        let view = VideoPreviewView()
        view.videoPreviewLayer.videoGravity = .resizeAspectFill
        view.videoPreviewLayer.session = controller.session
        controller.videoPreviewLayer = view.videoPreviewLayer
        return view
    }

    func updateUIView(_ uiView: VideoPreviewView, context: Context) {
    }

    class VideoPreviewView: UIView {
        override class var layerClass: AnyClass {
            AVCaptureVideoPreviewLayer.self
        }

        var videoPreviewLayer: AVCaptureVideoPreviewLayer {
            // swiftlint:disable:next force_cast
            return layer as! AVCaptureVideoPreviewLayer
        }
    }
}