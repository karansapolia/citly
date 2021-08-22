# frozen_string_literal: true

class CreateLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :links do |t|
      t.string :original, null: false
      t.string :shortened
      t.integer :clicks
      t.boolean :pinned

      t.timestamps
    end
  end
end
