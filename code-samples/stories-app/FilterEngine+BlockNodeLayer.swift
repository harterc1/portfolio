import QuartzCore
import Combine
import AVFoundation
import UIKit

extension FilterEngine {
    /// Generates a CALayer that implements the attributes on a VML vmg-block element.
    ///
    /// As with everything under the FilterEngine namespace, features are implemented
    /// as needed.  Don't expect all vmg-block attributes to be implemented.
    ///
    class BlockNodeLayer: LayoutLayer, FilterEngineNodeLayer {
        var node: Node
        weak var parentLayer: CALayer?
        var observers: [AnyCancellable] = []

        required init(node: Node, parentLayer: CALayer?, startTime: TimeInterval? = AVCoreAnimationBeginTimeAtZero, isGeometryFlipped: Bool, withAnimation: Bool) {
            self.node = node
            self.parentLayer = parentLayer
            super.init()
            self.isGeometryFlipped = isGeometryFlipped
            self.setupBindings()
        }

        required init?(coder: NSCoder) {
            fatalError("init(coder:) has not been implemented")
        }

        override var maxSublayerSize: CGSize {
            let maxFrameWidth = autoFitFrameX ? parentLayer?.maxSublayerSize.width ?? frame.width : frame.width
            let maxFrameHeight = autoFitFrameY ? parentLayer?.maxSublayerSize.height ?? frame.height : frame.height

            return .init(
                width: maxFrameWidth - padding.left - padding.right,
                height: maxFrameHeight - padding.top - padding.bottom)
        }

        func attributesDidUpdate(_ attributes: Node.Attributes) {
            self.isHidden = !attributes.visible
            guard isHidden == false else {
                self.frame = CGRect.zero
                return
            }

            verticalAlignment = attributes.justifyContent
            horizontalAlignment = attributes.alignItems

            if let backgroundColor = attributes[.backgroundColor] {
                self.backgroundColor = UIColor(hex: backgroundColor)?.cgColor ?? UIColor.clear.cgColor
            }

            self.padding = .init(
                top: attributes.paddingTop,
                left: attributes.paddingLeft,
                right: attributes.paddingRight,
                bottom: attributes.paddingBottom
            )

            autoFitFrameX = attributes[.width] == nil
            autoFitFrameY = attributes[.height] == nil

            self.frame = CGRect(
                x: frame.minX,
                y: frame.minY,
                width: attributes[.width] ?? 0,
                height: attributes[.height] ?? 0
            )
        }

        /// Any layer modifications that are applied in the specified action will have no
        /// inherit animations
        ///
        /// This isn't only a visual decision -- sometimes our app updates layers
        /// rapidly (i.e. when the updates are tied to a slider on the UI) and the animations
        /// for each layer update can create performance issues.
        override open class func defaultAction(forKey event: String) -> CAAction? {
            return NSNull()
        }
    }
}