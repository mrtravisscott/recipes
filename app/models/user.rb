class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false }
end
# def to_token_payload
#     {
#       sub: id,
#       name: name
#     }
# end  