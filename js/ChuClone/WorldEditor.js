(function() {
    var PTM_RATIO = ChuClone.Constants.PTM_RATIO;
    var WAIT_TIMEOUT = 0;

    ChuClone.namespace("ChuClone.editor.WorldEditor");

    /**
     * Creates a new WorldEditor
     * @param {ChuClone.WorldController} aWorldController
     */
    ChuClone.editor.WorldEditor = function( aWorldController ) {
        this._worldController = aWorldController;
        this._mousePosition = new Box2D.Common.Math.b2Vec2(0,0);

        this.setupMouseEvents();
        this.setupGui();
    };

    ChuClone.editor.WorldEditor.prototype = {
        /**
         * @type {ChuClone.WorldController}
         */
        _worldController    : null,
        /**
         * @type {ChuClone.GameView}
         */
        _gameView           : null,
        /**
         * @type {Box2D.Common.Math.b2Vec2}
         */
        _mousePosition      : null,
        /**
         * The currently edited b2Body
         * @type {Box2D.Dynamics.b2Body}
         */
        _currentBody        : null,
        /**
         * @type {DAT.GUI}
         */
        _guiModification                : null,
        /**
         * We modify this not the b2Body directly
         */
        _propProxy          : {x: 0, y: 0, width: 0, height:0},
        _controllers        : {},

                            // Store reference for remval later: HACK?
        _closures           : {'mousemove':null, 'mouseup':null, 'mousedown': null},

        setupMouseEvents: function() {
            var that = this;
            this._closures['mousedown'] = function(e) { that.onDocumentMouseDown(e); };
            this._closures['mousemove'] = function(e) { that.onMouseMove(e); };
            this._closures['mouseup'] = function(e) { that.onMouseUp(e); };

            window.addEventListener( 'mousedown', this._closures['mousedown'], false );
            window.addEventListener( 'mouseup', this._closures['mouseup'], false );
        },

        /**
         * Setup DAT.GUI controllers
         */
        setupGui: function() {
            this._guiModification = new DAT.GUI();
            this._guiModification.name("Modification");
            this._guiModification.autoListen = false;

            this.addControllerWithTimeout(this._guiModification, "x", 0).step(0.1);
            this.addControllerWithTimeout(this._guiModification, "y", 0).step(0.1);
            this.addControllerWithTimeout(this._guiModification, "width", 0).min(0.01).max(2000);
            this.addControllerWithTimeout(this._guiModification, "height", 0).min(0.01).max(2000);
            this._guiModification.close();
            this._guiModification.open();


            this._guiCreation = new DAT.GUI();
            this._guiCreation.name("Creation");
            this._guiCreation.autoListen = false;
            this._controllers['onShouldCreate'] = this._guiCreation.add(this, 'onShouldCreate').name("Create Entity");
            this._controllers['onShouldDelete'] = this._guiCreation.add(this, 'onShouldDelete').name("Destroy Last Entity");

            this._controllers['type'] = this._guiCreation.add(this, 'onShouldDelete').name("Destroy Last Entity")
            //ui.add(obj, 'propertyName').options({'Small': 1, 'Medium': 2, 'Large': 3});

            this._guiCreation.close();
            this._guiCreation.open();
        },

        onShouldCreate: function(e) {
            console.log(this,"ABC");
        },

        onShouldDelete: function(e) {
            console.log(this,"ABC");
        },

        /**
         * Called by onDocumentMouseDown
         * @param {MouseEvent} e
         */
        onDocumentMouseDown: function(e) {
            e.preventDefault();
            this.updateMousePosition(e);

            var pos = new Box2D.Common.Math.b2Vec2(this._mousePosition.x, this._mousePosition.y);
            pos.Multiply( 1.0 / this._worldController.getDebugDraw().GetDrawScale() );

            var selectedBody = this.getBodyAtPosition( pos );

            if(selectedBody) {
                this._currentBody = selectedBody;

                window.removeEventListener( 'mousemove', this._closures['mousemove'], false );
                window.addEventListener( 'mousemove', this._closures['mousemove'], false );
            }

        },

        /**
         * Window 'mousemove' callback
         * @param {MouseEvent} e
         */
        onMouseMove: function(e) {
            if( !this._currentBody ) return;
            this.updateMousePosition(e);

            var pos = new Box2D.Common.Math.b2Vec2(this._mousePosition.x, this._mousePosition.y);
            pos.Multiply( 1.0 / this._worldController.getDebugDraw().GetDrawScale() );

            this._currentBody.SetPosition(pos);
            this.populateInfoWithB2Body( this._currentBody );
        },

        /**
         * Window 'mouseup' callback
         * @param {MouseEvent} e
         */
        onMouseUp: function(e) {
            window.removeEventListener( 'mousemove', this._closures['mousemove'], false );
            this.updateMousePosition(e);
        },

        /**
         * Returns the body at a point, point should be scaled relative position already (@see Box2D.Dynamics.b2DebugDraw.GetDrawScale())
         * // TODO: IMPLEMENT FILTERING?
         * @param {Box2D.Common.Math.b2Vec2} pos
         * @return {Box2D.Dynamics.b2Body}
         */
        getBodyAtPosition: function(pos) {
            var size = 0.1;
            var aabb = new Box2D.Collision.b2AABB();
            aabb.lowerBound.Set( pos.x - size, pos.y - size );
            aabb.upperBound.Set( pos.x + size, pos.y + size );


            var that = this;
            var selectedBody = null;
            that._worldController.getWorld().QueryAABB(function getBodyCB(fixture) {
                // Only level objects
                if(fixture.GetBody().GetUserData() instanceof ChuClone.GameEntity) {
                    selectedBody = fixture.GetBody();
                    return true;
                }
                return false;
            }, aabb);

            if( selectedBody ) {
                this._currentBody = selectedBody;
                this.populateInfoWithB2Body( selectedBody );
            }

            return selectedBody
        },

        /**
         * Populates the GUI.DAT panel with information about this Box2D Body
         * @param aBody
         */
        populateInfoWithB2Body: function( aBody ) {
            this._controllers['x'].setValue( aBody.GetPosition().x );
            this._controllers['y'].setValue( aBody.GetPosition().y );
            this._controllers['width'].setValue( this._currentBody.GetUserData().getDimensions().width );
            this._controllers['height'].setValue( this._currentBody.GetUserData().getDimensions().height );
        },

        onControllerWasChanged: function( newValue ) {
            if(this._currentBody == null) return;


            // Create a new using current body's data
            var newBody = this._worldController.createRect(
                this._controllers['x'].getValue() * PTM_RATIO,
                this._controllers['y'].getValue()  * PTM_RATIO,
                this._currentBody.GetAngle(),
                this._controllers['width'].getValue(),
                this._controllers['height'].getValue(),
                this._currentBody.GetType() == Box2D.Dynamics.b2Body.b2_staticBody
            );


            // Destroy the old body, and store the current body inside the previous one's entity
            // NOTE: Assumes GetUserData is of type ChuClone.GameEntity
            var entity = this._currentBody.GetUserData();

            this._worldController.getWorld().DestroyBody( this._currentBody );
            entity.setBody( newBody );

            // TODO: MODIFY GEOMETRY CORRECTLY INSTEAD OF SCALING
            entity.getView().scale.x = this._controllers['width'].getValue() * 2;
            entity.getView().scale.y = this._controllers['height'].getValue() * 2;


            this._currentBody = newBody;
        },

        /**
         * Clones a box2d body
         */
        cloneBody: function() {
            // Create a new using current body's data
            var newBody = this._worldController.createRect(
                this._currentBody.GetPosition.x * PTM_RATIO,
                this._currentBody.GetPosition.y * PTM_RATIO,
                this._currentBody.GetAngle(),
                this._currentBody.GetUserData().getDimensions().width,
                this._currentBody.GetUserData().getDimensions().height,
                this._currentBody.GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody
            );
        },

        /**
         * Sets the _mousePosition property taking the canvas position into account
         * @param {MouseEvent}  e
         */
        updateMousePosition: function(e) {
            var x = 0,
                y = 0;

            // Get the mouse position relative to the canvas element.
            if (e.layerX || e.layerX == 0) { // Firefox
                x = e.layerX;
                y = e.layerY;
            } else if (e.offsetX || e.offsetX == 0) { // Opera
                x = e.offsetX;
                y = e.offsetY;
            }
            // Offset for canvas
            this._mousePosition.x = x - this._worldController.getDebugDraw().GetSprite().canvas.offsetLeft;// - (this._worldController.getDebugDraw().offsetX/this._worldController.getDebugDraw().GetDrawScale());
            this._mousePosition.y = y - this._worldController.getDebugDraw().GetSprite().canvas.offsetTop;

            // Offset for DEBUGDRAW
            this._mousePosition.x -= this._worldController.getDebugDraw().offsetX*this._worldController.getDebugDraw().GetDrawScale();
            this._mousePosition.y -= this._worldController.getDebugDraw().offsetY*this._worldController.getDebugDraw().GetDrawScale();
        },

        /**
         * Adds a controller to DAT.GUI and adds it into our _controllers object.
         * This function also sets a timeout that will be destroyed if the value is changed while waiting to be fired
         * @param {DAT.GUI} aGui
         * @param {String} propName
         * @param {String|Number|Boolean} initialValue
         * @return {DAT.GUI.Controller}
         */
        addControllerWithTimeout: function(aGui, propName, initialValue) {

            var that = this;
            this._propProxy[propName] = initialValue;

            var controller = aGui.add(this._propProxy, propName);
            this._controllers[propName] = controller;

            // Set a timeout that will be destroyed if the value is changed while waiting to be fired
            controller.onFinishChange( function(newValue) {
                clearTimeout( WAIT_TIMEOUT );
                WAIT_TIMEOUT = setTimeout( function() {
                    that.onControllerWasChanged(newValue);
                }, 500);
            });

            return controller;
        },

        removeController: function( propName ) {
            // TODO: Not Implemented
        },


        dealloc: function() {
            window.removeEventListener('mousedown', this._closures['mousedown'], false );
            window.removeEventListener('mousemove', this._closures['mousemove'], false );
            window.removeEventListener('mouseup', this._closures['mouseup'], false );

            this._worldController = null;
            this._gameView = null;
            this._currentBody = null;
            this._mousePosition = null;
            this._worldController = null;
        }
}
})();