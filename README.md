# Official Website Framework <a href="README-ZH.md"> <img width="20px" src="flag-china.svg" />中文文档</a> 
It is a fast, simple yet fully featured and very efficient official website framework for Gulp + Html + Jquery + Sass. 


# Official Website Framework Characteristic  
* Using `@@include`, import a common Layout in html, avoid code duplication. Such as Nav, Footer Layout.
  
* Using `gulp` script, separation of development and build. Such as Sass automatically converted to a CSS file.

* Using `browser-sync`, to achieve hot deployment after code modification in development.
  
* Using `gulp-rev`, to achieve automatically add the hash value of the file at the end of the file name to solve the browser cache problem. Such as CSS, JS, Img, Json and so on.
  
* Using `$.getjson` to access Json file, to achieve the acquisition of site dynamic data, without back-end development. 


# Quick Start
1. Globally install Node [Download Node installation package](https://nodejs.org/en/download/).
   
2. Globally install gulp-cli.
   ```shell
   npm -g install gulp-cli
   ```
   
3. Run `npm install` in the Official-Website-Framework root directory to download the three-party libraries that the project depends on.
   
4. Run `npm run dev` to automatically open the browser and access the template site.


# Publishing site
1. Execute `npm run publish` to publish all site files which generated in the .dist directory.
   
2. Install apache on the web server. Such as, run `apt install apache` on Linux.
   
3. Access 'ip:80' in the browser. If the default apache page is displayed, so the apache installation is successful.
   
4. Apache is automatically installed by command, the configuration file is in the `/etc/nginx` directory, `sites-available/default` is the configuration file of the default apache page published, pointing to the web service directory `/var/www/html`. After adding the 404 page configuration to the default configuration file, execute `nginx -s reload`.   
       
   ```
   server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # add 404 pape config
        error_page 404 /404.html;
    }
   ```

5.  Run `sh deploy.sh` to upload the contents of the .dist directory to the '/var/www/html' directory of the web server.
   
6. Access 'ip:80' and publish it successfully.


# Web Development Useful Link
[Css Animation: Cross-browser Animations Lib](https://animate.style/)  

[Caniuse: provides up-to-date browser support for web technologies](https://caniuse.com/)

[Css Normalize: A modern alternative to CSS resets](https://github.com/necolas/normalize.css)


