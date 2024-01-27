import QuartzCore
import Combine
import AVFoundation

extension FilterEngine {
    class NodeLayer: CALayer, FilterEngineNodeLayer {
        var node: Node
        var withAnimation: Bool
        var startTime: TimeInterval
        weak var parentLayer: CALayer?
        var observers: [AnyCancellable] = []

        required init(node: Node, parentLayer: CALayer?, startTime: TimeInterval? = AVCoreAnimationBeginTimeAtZero, isGeometryFlipped: Bool, withAnimation: Bool) {
            self.node = node
            self.withAnimation = withAnimation
            self.parentLayer = parentLayer
            self.startTime = startTime ?? AVCoreAnimationBeginTimeAtZero
            super.init()
            self.isGeometryFlipped = isGeometryFlipped
            self.setupBindings()
        }

        override init(layer: Any) {
            guard let layer = layer as? NodeLayer else {
                let typeName = String(describing: Self.self)
                fatalError("\(typeName) copy constructor can only copy other \(typeName)s")
            }
            self.node = layer.node
            self.parentLayer = layer.parentLayer
            self.withAnimation = layer.withAnimation
            self.startTime = layer.startTime
            super.init(layer: layer)
        }

        required init?(coder: NSCoder) {
            fatalError("init(coder:) has not been implemented")
        }

        func textDidUpdate(_ text: String) { }
        func attributesDidUpdate(_ attributes: Node.Attributes) { }

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