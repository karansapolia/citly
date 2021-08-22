# frozen_string_literal: true

class Link < ApplicationRecord
  validates :original, presence: true, format: URI::regexp(%w[http https])
  validates_uniqueness_of :shortened
  validates_length_of :original, within: 3..255, on: :create, message: "URL too long"
  validates_length_of :shortened, within: 3..255, on: :create, message: "Shortened link too long"

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
