/**
File:
	PlayLevelState.js
Created By:
	Mario Gonzalez
Project	:
	ChuClone
Abstract:
 	Gameplaying state
 
 Basic Usage:

 License:
    Creative Commons Attribution-NonCommercial-ShareAlike
    http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
(function(){
    "use strict";

	ChuClone.namespace("ChuClone.states");

	ChuClone.states.PlayLevelState = function() {
		ChuClone.states.PlayLevelState.superclass.constructor.call(this);
	};

	ChuClone.states.PlayLevelState.prototype = {

        /**
         * @type {Number}
         */
        _currentTime    : 0,
        _previousTime   : 0,
        _elapsedTime    : 0,

        _lastTextUpdate : 0,
        
        /**
         * @type {ChuClone.GameViewController}
         */
        _gameView: null,

        /**
         * @type {ChuClone.physics.WorldController}
         */
        _worldController: null,

        /**
         * @type {ChuClone.editor.LevelManager}
         */
        _levelManager: null,

        /**
         * @type {ChuClone.PlayerEntity}
         */
        _player         : null,

        // Internal state
        _beatLevel      : false,

		/**
		 * @inheritDoc
		 */
		enter: function() {
			ChuClone.states.PlayLevelState.superclass.enter.call(this);

            this._beatLevel = false;
            this._previousTime = Date.now();
            this.setupEvents();
		},

        setupEvents: function() {
            var that = this;
            this.addListener( ChuClone.components.GoalPadComponent.prototype.EVENTS.GOAL_REACHED, function( aGoalPad ) { that.onGoalReached( aGoalPad ) } );
            this.addListener( ChuClone.editor.LevelManager.prototype.EVENTS.LEVEL_CREATED, function( aLevelManager ) { that.onLevelLoaded( aLevelManager ) } );
            ChuClone.Events.Dispatcher.addListener(ChuClone.PlayerEntity.prototype.EVENTS.CREATED, function( aPlayer ) {
                that._player = aPlayer;

				var respawnPoint = ChuClone.components.RespawnComponent.prototype.GET_CURRENT_RESPAWNPOINT();
				respawnPoint.setSpawnedEntityPosition( that._player );

                var gameCamera = that._gameView.getCamera();
                ChuClone.editor.CameraGUI.prototype.augmentCamera.call( this, gameCamera );


                var followPlayerComponent = new ChuClone.components.camera.CameraFollowPlayerComponent();
                followPlayerComponent.setPlayer( that._player );
                gameCamera.addComponentAndExecute( followPlayerComponent );


                var focusComponent = new ChuClone.components.camera.CameraFocusRadiusComponent();
                gameCamera.addComponentAndExecute(focusComponent);
                focusComponent.getRadius().x = 2500;
                focusComponent.getRadius().y = 1000;
                focusComponent.getRadius().z = 2000;

            });
        },

        /**
         * @inheritDoc
         */
        update: function() {
            ChuClone.states.PlayLevelState.superclass.update.call(this);
            this.updateTime();

            /**
             * @type {Box2D.Dynamics.b2Body}
             */
            var node = this._worldController.getWorld().GetBodyList();
            while(node) {
                var b = node;
                node = node.GetNext();
                /**
                 * @type {ChuClone.GameEntity}
                 */
                var entity = b.GetUserData();
                if(entity)
                    entity.update();
            }

            this._worldController.update();
            this._gameView.update( this._currentTime );


            if( this._currentTime - this._lastTextUpdate > 128 ) {
                this._lastTextUpdate = this._currentTime;
                ChuClone.gui.HUDController.setTimeInSeconds( this._elapsedTime );
            }
        },

		/**
		 * Updates elapsed time until level is completed
		 */
        updateTime: function() {
            if( this._beatLevel )
                return;
            
            this._currentTime = Date.now();
            this._elapsedTime += this._currentTime - this._previousTime;
            this._previousTime = this._currentTime;
        },

        /**
		 * Called when a goal is hit
		 * @param {ChuClone.editor.LevelManager} aLevelManager
		 */
		onLevelLoaded: function( aLevelManager ) {
            this._worldController.createBox2dWorld()
		},

         /**
		 * Called when a goal is hit
		 * @param {ChuClone.components.GoalPadComponent} aGoalComponent
		 */
		onGoalReached: function( aGoalComponent ) {
			console.log("ChuClone.states.PlayLevelState:", aGoalComponent);
			 ChuClone.gui.HUDController.setTimeInSeconds( this._elapsedTime );
			 this._beatLevel = true;
		},

        /**
         * @inheritDoc
         */
        exit: function() {

            console.log("Exiting PlayLevelState!");
            ChuClone.states.PlayLevelState.superclass.exit.call(this);

            this.removeListener( ChuClone.components.GoalPadComponent.prototype.EVENTS.GOAL_REACHED );

            this.dealloc();
        },

        /**
         * @inheritDoc
         */
        dealloc: function() {
            this._worldController = null;
            this._gameView = null;
            this._player = null;
        }
	};

    ChuClone.extend( ChuClone.states.PlayLevelState, ChuClone.model.FSM.State );
})();