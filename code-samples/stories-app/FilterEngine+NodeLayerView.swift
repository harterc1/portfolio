import SwiftUI
import AVFoundation

extension FilterEngine {
    struct NodeLayerView: UIViewRepresentable {
        var playerItem: Video.Player.Item?
        var node: Node
        var withAnimation: Bool
        var size: CGSize
        var onTapNodeLayer: ((FilterEngineNodeLayer) -> Void)?

        func makeUIView(context: Context) -> some UIView {
            let uiView = UIView()

            let tap = UITapGestureRecognizer(
                target: context.coordinator,
                action: #selector(context.coordinator.tapHandler)
            )
            uiView.addGestureRecognizer(tap)

            return uiView
        }

        func updateUIView(_ uiView: UIViewType, context: Context) {
            context.coordinator.onTapNodeLayer = onTapNodeLayer

            uiView.layer.sublayers?.removeAll()

            var layer = uiView.layer

            if let playerItem = playerItem {
                layer = AVSynchronizedLayer(playerItem: playerItem)
                layer.frame = uiView.bounds
            }

            if let nodeLayer = FilterEngine.NodeLayer.Factory.createLayer(
                for: node,
                parentLayer: layer,
                isGeometryFlipped: true,
                withAnimation: withAnimation
            ) {
                if playerItem != nil {
                    layer.addSublayer(nodeLayer)
                    uiView.layer.addSublayer(layer)
                } else {
                    uiView.layer.addSublayer(nodeLayer)
                }
            }

            if let sublayers = layer.sublayers, sublayers.count > 0 {
                let oldHeight = size.height
                let oldWidth = size.width
                let heightScale = oldHeight / sublayers[0].frame.height
                let widthScale = oldWidth / sublayers[0].frame.width

                let scale = min(widthScale, heightScale)
                uiView.transform = CGAffineTransform(scaleX: scale, y: scale)
            }
        }

        func makeCoordinator() -> Coordinator {
            Coordinator()
        }

        class Coordinator {
            var onTapNodeLayer: ((FilterEngineNodeLayer) -> Void)?

            @objc func tapHandler(gesture: UITapGestureRecognizer) {
                guard
                    let onTapNodeLayer = onTapNodeLayer,
                    let uiView = gesture.view,
                    let sublayer = uiView.layer.sublayers?.first
                else { return }

                let location = gesture.location(in: uiView)

                var layer = sublayer.hitTest(location)

                // Traverse up layer tree to find nearest node layer
                var nodeLayer: FilterEngineNodeLayer?
                while true {
                    nodeLayer = layer as? FilterEngineNodeLayer
                    if nodeLayer != nil { break }
                    layer = layer?.superlayer
                    if layer == nil { break }
                }

                if let nodeLayer = nodeLayer {
                    onTapNodeLayer(nodeLayer)
                }
            }
        }
    }
}