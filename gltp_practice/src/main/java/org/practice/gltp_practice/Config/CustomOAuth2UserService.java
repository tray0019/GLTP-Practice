package org.practice.gltp_practice.Config;

import org.practice.gltp_practice.Entity.User;
import org.practice.gltp_practice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public OAuth2User loadUser(OAuth2UserRequest userRequest) 
        throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");
        
        User user = userRepository.findByEmail(email).orElseGet(() -> {
           User newUser = new User();
           newUser.setEmail(email);
            newUser.setProvider("GOOGLE");

           String googleId = oAuth2User.getAttribute("sub");
           newUser.setProviderUserId(googleId);

           newUser.setFirstName(oAuth2User.getAttribute("given_name"));
            newUser.setLastName(oAuth2User.getAttribute("family_name"));
            return userRepository.save(newUser);
        });

        List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(user.getRole().name())
        );

        return new DefaultOAuth2User(
                authorities,
                oAuth2User.getAttributes(),
                "email"
        );
        
    }
    
}
