# frozen_string_literal: true

class LinksController < ApplicationController
  def index
    links = Link.all.order("links.pinned DESC")
    render status: :ok, json: { links: links }
  end

  def show
    link = Link.find_by_shortened(params[:shortened])
    link.update_attribute(:clicks, link.clicks + 1)
    render status: :ok, json: { link: link }
  rescue ActiveRecord::RecordNotFound => errors
    render json: { errors: errors }, status: :not_found
  end

  def create
    link = Link.find_by_original(params[:link][:original])
    if link
      render status: :unprocessable_entity, json: { error: "Duplicate link. Same URL already shortened." }
    else
      link = Link.new(link_params)
      if link.save
        render status: :ok, json: { notice: "Link successfully saved", link: link }
      else
        render status: :unprocessable_entity, json: { error: link.errors.full_messages.to_sentence }
      end
    end
  end

  def update
    link = Link.find(params[:id])
    if link.update(link_params)
      render status: :ok, json: { link: link }
    else
      render status: :unprocessable_entity, json: { errors: link.errors.full_messages.to_sentence }
    end
  end

  private

    def link_params
      params.require(:link).permit(:original, :shortened, :pinned)
    end
end
