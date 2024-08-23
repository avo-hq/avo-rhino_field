module Avo
  module RhinoField
    module Fields
      class RhinoField < Avo::Fields::BaseField
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
