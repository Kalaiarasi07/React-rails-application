class ApplicationController < ActionController::Base

  helper_method :current_user
  helper_method :logged_in?
  helper_method :admin?

  def current_user    
    User.find_by(uuid: session[:uuid])  
  end

  def logged_in?
    !current_user.nil?  
  end

  def admin?
    true if current_user[:user_type] === "admin" 
  end

end
