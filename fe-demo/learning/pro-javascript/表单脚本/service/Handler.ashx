<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        System.Collections.Specialized.NameValueCollection  query = context.Request.QueryString;
        System.Collections.Specialized.NameValueCollection form = context.Request.Form;
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}