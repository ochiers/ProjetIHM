package servlets;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import beans.BeanPanier;



public class ServletPanier extends HttpServlet {

	@EJB
	BeanPanier panier;
	
	public ServletPanier() {
		// TODO Auto-generated constructor stub
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	
		if(request.getParameter("action").equals("GET")){

			response.setContentType("application/json");
			response.getWriter().println("{\"posX\":"+panier.getPosX()+"}");
		}
		else if(request.getParameter("action").equals("POST")){

			double x = Double.parseDouble(request.getParameter("posX"));
			panier.setPosX(x);
			
		}
		
	}

}
