In /backend/manage.py, one line that needs explanation is 
```
from current_settings import settings
```
this line expects that in /backend/ there is another file called current_settings.py, whose contents are this:
```
settings = "mysite.settings.base"
```
if the server is on my raspberry pi, and 
```
settings = "mysite.settings.desktop"
```
if on my desktop