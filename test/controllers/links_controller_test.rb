# frozen_string_literal: true

require "test_helper"

class LinksControllerTest < ActionDispatch::IntegrationTest
  def test_should_list_all_links
    get links_url
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["links"].length, Link.count
  end

  def test_should_add_link_with_valid_url
    post links_url, params: {
      link: {
        original: "https://citly.herokuapp.com/"
      }
    }

    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Link successfully saved"
  end

  def test_should_not_add_link_with_invalid_url
    post links_url, params: {
      link: {
        original: "https"
      }
    }

    assert_response :unprocessable_entity
    assert_equal response.parsed_body["error"], "Original  URL is invalid and Original URL too short"
  end
end
