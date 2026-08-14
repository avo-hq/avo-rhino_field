module Avo
  module RhinoField
    module Fields
      class RhinoField < Avo::Fields::BaseField
        # Avo >= 4.2 lets the editor viewport be resized with a persisted height.
        resizable_editor target: "avo-rhino-editor > .trix-content[slot='editor']" if respond_to?(:resizable_editor)

        attr_reader :always_show

        def initialize(id, **args, &block)
          super(id, **args, &block)

          hide_on :index

          @always_show = args[:always_show] || false
        end

        def view_component_namespace
          "Avo::Fields::RhinoField"
        end
      end
    end
  end
end
