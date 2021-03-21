# SSR配置

## Mac配置

1. Mac下载客户端 [ShadowsocksX-NG](https://github.com/shadowsocks/ShadowsocksX-NG)

2. 终端代理

   **临时终端**

   ```
   export http_proxy=http://127.0.0.1:1087;
   export https_proxy=http://127.0.0.1:1087;
   ```

   **永久写入**

   安装[ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

   ```
   vim ~/.zshrc
   
   # proxy list
   alias proxy='export all_proxy=http://127.0.0.1:1087'
   alias unproxy='unset all_proxy'
   
   source ~/.zshrc
   ```

3. 设置代理

   运行 **proxy** 即可设置代理

   运行 **unproxy** 取消代理

4. 验证

   ```
   curl www.google.com
   
   curl cip.cc
   ```
   
   
   
   
   
   
   
   

