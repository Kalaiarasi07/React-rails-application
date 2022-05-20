class SessionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  # SIGN UP
  def signup
    @user = User.create(user_params)
    if @user.valid?
      session[:uuid] = @user.uuid
      render json: {user: @user}
    else
      render json: {error: "Email exists already! Try logging in"}, status: 409
    end
  end

  # LOGGING IN
  def login
    user = User.find_by(email: params[:email])
    if user  && user.authenticate(params[:password])
      session[:uuid] = user.uuid
      render json: {user: user}
    else
      render json: {error: "*Invalid username or password"}, status:401
    end
  end

  #DELETE SESSION OF CURRENT USER
  def destroy
    if session.clear
      render json: {status: "Logged out!"}
    else
      render json: {status: "Error in logging out!"}
    end
  end


  private

  def user_params
    joined_at = Time.now.to_i
    params.permit(:name,:email,:phone,:user_type, :password, :session).merge(joined_at: joined_at)
  end

end
