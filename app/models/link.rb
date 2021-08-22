# frozen_string_literal: true

class Link < ApplicationRecord
  validates :original, presence: true
end
