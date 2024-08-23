# frozen_string_literal: true

class Avo::Fields::RhinoField::EditComponent < Avo::Fields::EditComponent
  attr_reader :resource

  def initialize(**args)
    @resource = args[:resource]
    @resource_id = args[:resource_id] || @resource&.record&.to_param
    @resource_name = args[:resource_name] || @resource&.singular_route_key

    super(**args)
  end

  def field_id
    if @resource_name.present?
      "rhino_#{@resource_name}_#{@field.id}"
    elsif form.present?
      "rhino_#{form.index}_#{@field.id}"
    end
  end
end
