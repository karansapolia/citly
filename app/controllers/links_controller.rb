# frozen_string_literal: true

class LinksController < ApplicationController
  def index
    links = Link.all
    render status: :ok, json: { links: links }
  end
end
