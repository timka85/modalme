var Modal = (function(window, $, undefined){
    'use strict';

    var id = 0,

        // Scroll position before opening the box.
        scroll = 0,
    
        // Min.width of box in pixels.
        minWidthPixel = 150,
    
        // Min.width of box in percents.
        minWidthPercent = 10,
    
        // Max.width of box in percents.
        maxWidthPercent = 90,
    
        // Some options of each opened box.
        boxOptions = [],

        // Default properties.
        defaults = {
            // Default width of box.
            width: '60%',
            // Show header.
            title: false,
            // Is the box a layer.
            layer: false
        };

    var pub = {
        open: function(options) {
            var _this = this;

            // Collect options.
            var options = $.extend(defaults, options);

            // If there is content to show.
            if ( options.text || options.url ) {

                // Save position of scroll before opening first box.
                if ( id == 0 ) {
                    scroll = $(window).scrollTop();
                }

                // Getting id for new box.
                var modalId = id + 1;

                // Should we open this box as new layer?
                var layer = options.layer || false;

                // If it's not a layer than close all boxes opened before.
                if (! layer ) {
                    _this.closeAll();
                }

                // Remote content.
                if ( options.url ) {
                    var $box = createDomElement(modalId, options, true);
                    var data = options.data || {};
                    
                    $box.load(options.url, data, function() {
                        _this.place(modalId);
                        id = modalId;
                    });
                } 

                // Content placed through text attribute.
                else {
                    var $box = createDomElement(modalId, options);
                    if ( $box.append(options.text) ) {
                        _this.place(modalId);
                        id = modalId;
                    }
                }
            
                // Save properties of the box.
                boxOptions[modalId] = {
                    width: options.width ? options.width : defaults.width,
                    title: options.title ? options.title : '',
                };
            }
        },

        /**
         * Placing the box and showing it.
         */
        place: function(id) {
            show(id);
            this.posX(id);
            this.posY(id);
        },

        /**
         * Placing box in X-axis.
         */
        posX: function(id) {
            var $box = getBox(id);
            if ( $box ) {
                var options = boxOptions[id] ? boxOptions[id] : {};

                var width = options.width || defaults.width,
                    winWidth = $(window).width() || 0;

                // Defined in pixels;
                if ( width == +width ) {
                    width = width < minWidthPixel ? minWidthPixel : width;

                    var fit = width < (winWidth - 40);
                    
                    $box.css({
                        width: fit ? width : (winWidth - 40),
                        left : fit ? '50%' : 20,
                        'margin-left': fit ? (-1 * width)/2 : 0
                    });
                }

                // Defined in percents;
                else {
                    if ( width.indexOf('%') != '-1' ) {

                        width = width.replace('%','');
                        width = width > maxWidthPercent ? maxWidthPercent : width;
                        width = width < minWidthPercent ? minWidthPercent : width;

                        $box.css({
                            width: width + '%',
                            'margin-left': -1 * (winWidth*width/200)
                        });
                    }
                }
            }
        },

        /**
         * Placing box in Y-axis.
         */
        posY: function(id) {
            var $box = getBox(id);

            if ( $box ) {
                var boxHeight = $box.height() || 0,
                    winHeight = $(window).height() || 0,
                    fit       = boxHeight < (winHeight - 40);
                $box.css({
                    top: fit ? 0 : 20,
                    'margin-top': fit ? (winHeight - boxHeight)/3 : 0
                });
            }
        },

        /**
         * Resizing box by ID.
         */
        resize: function(modalId) {
            this.posX(modalId);
            this.posY(modalId);
        },

        /**
         * Resize all modal-boxes.
         */
        resizeAll: function() {
            if ( boxOptions ) {
                for ( var k in boxOptions ) {
                    if ( k && isBox(k) ) {
                        this.resize(k);
                    } else {
                        delete boxOptions[k];
                    }
                }
            }
        },

        /**
         * Close the box.
         */
        close: function(modalId) {
            hide(modalId || id);
        },

        /**
         * Close all modal-boxes.
         */
        closeAll: function() {
            hideAll();
        }
    };

    // Private functions.

    /**
     * Creating DOM elements and adding them to body of the page.
     */
    function createDomElement(id, opts, remote) {
        var $container = $('<div>')
            .attr({
                'class': 'modalme modalme-close',
                'data-id': id
            })
            .appendTo('body');
        
        var $box = $('<div>')
            .attr({'class': 'modalme-body'})
            .appendTo($container);

        if ( opts.title ) {
            var $header = $('<div>')
                .attr({'class': 'modalme-header'})
                .html(opts.title)
                .appendTo($box);
            $('<div>')
                .attr({'class': 'closer modalme-close'})
                .html('&times;')
                .prependTo($header);
        } else {
            $('<div>')
                .attr({'class': 'closer modalme-close'})
                .html('&times;')
                .appendTo($box);
        }

        if ( remote ) {
            return $('<div>')
                .attr({'class': 'modalme-load'})
                .appendTo($box);
        }

        return $box;
    };

    /**
     * Return body of the box.
     */
    function getBox(id) {
        return $('.modalme[data-id="' + id + '"] .modalme-body').length ? $('.modalme[data-id="' + id + '"] .modalme-body') : false;
    };

    /**
     * Showing the box.
     */
    function show(id){
        if (! $('html, body').hasClass('hidescroll') ) {
            $('html, body').addClass('hidescroll');
        }
        if ( $('.modalme[data-id="' + id + '"]').length ) {
            $('.modalme[data-id="' + id + '"]').show();
        }
    };

    /**
     * Close the box.
     */
    function hide(id) {
        if ( $('.modalme[data-id="' + id + '"]').length ) {
            $('.modalme[data-id="' + id + '"]')
                .hide()
                .remove();
        }
        pageScroll();
    };

    /**
     * Close all modal-boxes.
     */
    function hideAll() {
        if ( $('.modalme').length ) {
            $('.modalme')
                .hide()
                .remove();
        }
        pageScroll();
    };

    /**
     * Is there box with specified ID.
     */
    function isBox(id){
        return $('.modalme[data-id="' + id + '"]').length ? true : false;
    };

    /**
     * Is there boxes on the page.
     */
    function hasBox()
    {
        return $('.modalme').length ? true : false;
    };

    /**
     * Make page scrollable.
     */
    function pageScroll()
    {
        if (! hasBox() ) {
            $('html, body').removeClass('hidescroll');

            $(window).scrollTop(scroll);
        }
    };

    // Events.

    /**
     * Close.
     */
    $('body').on('click', '.modalme-close', function(e) {
        var id = $(this).closest('.modalme').data('id') || '';
        if ( $(e.target).hasClass('modalme-close') ) {
            pub.close(id);
        }
    });

    /**
     * On window resize we should resize boxex.
     */
    $(window).on('resize', function() {
        pub.resizeAll();
    });

    return pub;
})(window, jQuery);