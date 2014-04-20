# Modal.me.js

Modal-box module.
* [Example](http://itimka.ru)

## Features

- They are adaptive.
- You can create multiple boxes.
- You can control width of the box.
- Height calculation is based on the contents.

## Dependencies
- [jQuery](http://jquery.com)

## How to use

* **Modal.open(options)**

    Opening new modal box.
  
      Options:
    
      - width - (optional, default: '60%') in pixels (int) or percents (string, "90%");
    
      - title - (optional, default: false) title of the box.
    
      - layer - (optional, boolean) show as new layer (true), show as only layer (false).
    
      - text  - (optional, string) content of the box.
    
      - url   - (optional, string) if you need to get remote content than fill this field.
    
      To open box there should be defined `text` or `url` attributes.
      
      ```javascript
      // Opens as new layer.
      Modal.open({
        width: 700,
        title: 'Box title',
        layer: true,
        text : '<h2>Say hello!</h2>'
      });
      
      // Opens as the only layer.
      Modal.open({
        width: 700,
        title: 'Box title',
        text : '<h2>Say hello!</h2>'
      });
      
      // Getting remote content.
      Modal.open({
        width: '70%',
        title: 'Box title',
        url  : 'http://example.com/pages/info'
      });
      ```
    
* **Modal.resize(id = null)**
  
    Resizes box.
  
    If ID is defined, than box with this ID will be resized, otherwise last created box will be resized.

    ```javascript
    Modal.resize();
    ```

* **Modal.resizeAll()**
  
    Resizes all boxes.

    ```javascript
    Modal.resizeAll();
    ```

* **Modal.close(id = null)**

    If ID is defined, than box with this ID will be closed, otherwise last created box will be closed.
    
    ```javascript
    Modal.close();
    ```

* **Modal.closeAll()**
    
    Closing all boxes.

    ```javascript
    Modal.closeAll();
    ```
