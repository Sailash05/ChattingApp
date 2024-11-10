package com.example.chattingapplication;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingContoller {
	
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greetings greet(Hello message) {
		return new Greetings("-->"
				+ HtmlUtils.htmlEscape(message.getName()));
		
	}
}
