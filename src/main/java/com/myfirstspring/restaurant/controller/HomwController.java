package com.myfirstspring.restaurant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomwController {

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("name", "Grishma");
        return "index";
    }
}

