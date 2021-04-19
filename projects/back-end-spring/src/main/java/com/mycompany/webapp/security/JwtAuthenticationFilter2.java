package com.mycompany.webapp.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.GenericFilterBean;

public class JwtAuthenticationFilter2 extends GenericFilterBean{

	private UserDetailsService userDetailsService;
	
	public JwtAuthenticationFilter2(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		//JWT 토큰이 요청 헤더로 전송된 경우
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String jwt = httpRequest.getHeader("authToken");
		if(jwt == null) {
			//Jwt가 요청 파라미터로 전달된 경우
			//<img src="download?bno=3&authToken=xxxx"/>
			jwt = request.getParameter("authToken");
		}
		if(jwt != null) {
			if(JwtUtil.validateToken(jwt)) {
				//JWT에서 uid 얻기
				String uid = JwtUtil.getUid(jwt);
				//DB에서 uid에 해당하는 정보를 가져오기(이름, 권한(롤)들)   
				UserDetails userDetails = userDetailsService.loadUserByUsername(uid);
				//인증 객체 생성
				Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
				//Spring security에 인증 객체 등록(이 사람이 로그인 됐다~!)
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		chain.doFilter(request, response);
	}

}
