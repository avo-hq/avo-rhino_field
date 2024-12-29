# frozen_string_literal: true

class Avo::Fields::RhinoField::EditComponent < Avo::Fields::EditComponent
  attr_reader :resource

  def initialize(**args)
    @resource = args[:resource]
    @resource_id = args[:resource_id] || @resource&.record&.to_param
    @resource_name = args[:resource_name] || @resource&.singular_route_key

    super(**args)

    @unique_random_id = SecureRandom.hex(4)
  end

  def unique_id
    if @resource_name.present?
      "rhino_#{@resource_name}_#{@field.id}_#{@unique_random_id}"
    elsif form.present?
      "rhino_#{form.index}_#{@field.id}_#{@unique_random_id}"
    end
  end

  def unique_selector = ".#{unique_id}"

  def data
    {
      controller: "rhino-field",
      rhino_field_unique_selector_value: unique_selector, # mandatory
      rhino_field_resource_name_value: @resource_name,
      rhino_field_resource_id_value: @resource_id,
      blob_url_template: helpers.main_app.rails_service_blob_url(":signed_id", ":filename"),
      direct_upload_url: helpers.main_app.rails_direct_uploads_url,
      action: "rhino-before-initialize->rhino-field#onRhinoBeforeInitialize rhino-initialize->rhino-field#onRhinoInitialize rhino-change->rhino-field#onRhinoChange rhino-paste->rhino-field#onRhinoPaste rhino-selection-change->rhino-field#onRhinoSelectionChange rhino-focus->rhino-field#onRhinoFocus rhino-blur->rhino-field#onRhinoBlur rhino-file-accept->rhino-field#onRhinoFileAccept rhino-attachment-add->rhino-field#onRhinoAttachmentAdd rhino-attachment-remove->rhino-field#onRhinoAttachmentRemove",
      **@field.get_html(:data, view: view, element: :input)
    }
  end
end
