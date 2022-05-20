class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: false do |t|
      t.string :uuid, primary_key: true, null:false
      t.string :name
      t.string :email
      t.string :phone
      t.string :user_type
      t.string :password_digest
      t.bigint :joined_at

      t.timestamps
    end
  end
end
