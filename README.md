# Official Website Framework <a href="README-ZH.md"> <img width="20px" src="flag-china.svg" />中文文档</a> 
It is a fast, simple yet fully featured and very efficient official website framework for Gulp + Html + Jquery + Sass. 

[🚀🚀Official Website Demo Link](https://zhlu32.github.io/index.html)

# Official Website Framework Characteristic  
* Suitable for all major browsers and support mobile browsing.
  
* Using `gulp` script, separation of development and build. Such as Sass automatically converted to a CSS file.

* Using `browser-sync`, to achieve hot deployment after code modification in development.

* Using `gulp-file-include`, import a common Layout in html, avoid code duplication. Such as Nav, Footer Layout.

* Using `gulp-uglify`, to compress JS files; Using `gulp-cssnano`, compression CSS file. Reduce file size and speed up network request
  
* Using `gulp-rev`, to achieve automatically add the hash value of the file at the end of the file name to solve the browser cache problem. Such as CSS, JS, Img, Json and so on.
  
* Using `$.getjson` to access Json file, to achieve the acquisition of site dynamic data, without back-end development. 


# Official Website Framework Design
## Convention over configuration
* js file: src/js/

* css files: src/css/ (css file extensions can use scss or css)

* img image: src/img/

* Common components: src/components/

* Dynamic site data: src/moke/**/*.json

* Temp dir: .tmp/

* Publish dir: .dist/

## Page design
1. Set the page horizontally at 1200px as the edit area. Advantages: Automatically adapt to the mobile browser.

   Sample page layout:

   ```html
   <div class="g-section">
        <div class="g-section-content">
        </div>
   </div>
   ```  
2. The 'head', 'nav', 'footer' in different pages belong to repeated code, which is realized by the '@@include' technology.

   The 404 page code, So Simple 💎 :    
   ```html
   <!DOCTYPE html>
   <html>
   <head>
      @@include('component/header/header.html')
      <link rel="stylesheet" type="text/css" href="css/404.css">
   </head>
   <body>
      @@include('component/nav/nav.html')

      <div class="g-section" style="background-color: #F4F6FD; padding-bottom: 120px; padding-top: 195px; text-align: center;">
         <img src="img/common/404.png" style="width: 413px;">
         <p style="color:#333333; font-size: 12px; margin-top: 10px;">很抱歉，您访问的页面不存在</p>
         <div class="g-section-content" style="text-align: center; margin: 0 auto; padding-top: 36px;">
               <a href="index.html" class="back-index">返回首页</a>
         </div>
      </div>

      @@include('component/footer/footer.html')

   </body>
   </html>
   ``` 

# Quick Start
1. Globally install Node [Download Node installation package](https://nodejs.org/en/download/).
   
2. Globally install gulp-cli.
   ```shell
   npm -g install gulp-cli
   ```
   
3. Run `npm install` in the Official-Website-Framework root directory to download the three-party libraries that the project depends on.
   
4. Run `npm run dev` to automatically open the browser and access the template site.


# Publishing Site
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


# Web Development Useful Links
[Css Animation: Cross-browser Animations Lib](https://animate.style/)  

[Caniuse: provides up-to-date browser support for web technologies](https://caniuse.com/)

[Css Normalize: A modern alternative to CSS resets](https://github.com/necolas/normalize.css)


