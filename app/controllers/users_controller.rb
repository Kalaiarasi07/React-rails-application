class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # List all users 
  def all_users
    if logged_in?
      if admin?
        users = User.all
        render json: {users: users}
      else
        render json:{error: "Access forbidden: You are not an admin!"}, status:403
      end
    else
      render json: {error: "Log in first!"}, status:401
    end
  end

  # Sort users based on date range
  def sort
    from_date = DateTime.strptime(params[:start], '%Y/%m/%d').beginning_of_day.to_i
    to_date = DateTime.strptime(params[:end], '%Y/%m/%d').end_of_day.to_i
    users = User.where(:joined_at => from_date..to_date)
    render json: {users: users}
  end

  # Info of current user
  def user_info
    if logged_in?
      user = User.find_by(uuid: session[:uuid])
      render json: {user: user}
    else
      render json: {error: "Log in first!"}, status:401
    end
  end

end
    
