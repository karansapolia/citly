# frozen_string_literal: true

require "test_helper"

class LinkTest < ActiveSupport::TestCase
  def setup
    @link = Link.new(original: "https://news.ycombinator.com")
  end

  def test_link_should_not_be_valid_without_original
    @link.original = ""
    assert_not @link.valid?
    assert_includes @link.errors.full_messages, "Original can't be blank"
    assert_includes @link.errors.full_messages, "Original  URL is invalid"
  end

  def test_link_should_be_of_valid_length
    @link.original = "a" * 256
    assert @link.invalid?
  end

  def test_link_should_not_be_valid_and_saved_without_url
    @link.original = ""
    assert_not @link.valid?

    @link.save
    assert_equal ["Original can't be blank", "Original  URL is invalid", "Original URL too short"],
      @link.errors.full_messages
  end

  def test_link_should_not_be_valid_and_saved_if_url_not_unique
    @link.save!

    test_link = @link.dup
    assert_not test_link.valid?

    assert_equal ["Shortened has already been taken"], test_link.errors.full_messages
  end

  def test_link_should_accept_valid_urls
    valid_urls = %w[http://example.com https://example.COM http://www.a.org http://example.gov.in https://example.ac.in/12/do-it]

    valid_urls.each do |link|
      @link.original = link
      assert @link.valid?
    end
  end

  def test_link_should_not_accept_invalid_urls
    invalid_urls = %w[example.com http:// https]

    invalid_urls.each do |link|
      @link.original = link
      assert @link.invalid?
    end
  end
end
