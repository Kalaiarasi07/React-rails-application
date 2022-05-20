class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :phone, presence:true

  before_create :set_uuid
  def set_uuid
    self.uuid = SecureRandom.uuid
  end
end
