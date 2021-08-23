# frozen_string_literal: true

require "uri"
require_dependency "../validators/http_url_validator.rb"

class Link < ApplicationRecord
  validates :original, presence: true, http_url: true
  validates_uniqueness_of :shortened
  validates_length_of :original, within: 10..255, on: :create, too_short: "URL too short", too_long: "URL too long"

  before_validation :generate_shortened_url

  def generate_shortened_url
    self.shortened = SecureRandom.uuid[0..5] if self.shortened.nil? || self.shortened.nil?
    true
  end

  def short
    Rails.application.routes.url_helpers.short_url(shortened: self.shortened)
  end

  def self.shorten(original, shortened = "")
    link = Link.where(original: original, shortened: shortened).first
    return link.short if link

    link = Link.new(original: original, shortened: shortened)
    return link.short if link.save

    Link.shorten(original, shortened + SecureRandom.uuid[0..2])
  end
end
