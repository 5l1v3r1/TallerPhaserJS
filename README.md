### Tutorial Phaser para Sistemas y Tecnologías Web 
##### Gonzalo García | alu0100767087 

![Logo](http://i.imgur.com/OE5mw9f.png)

##### Lo básico:

Phaser es un framework orientado a objetos escrito en JavaScript que nos ayuda a crear videojuegos de forma sencilla utilizando como complemento HTML5. 

Phaser tiene como base Pixi.js, una librería de webGL + Canvas que sirve para crear gráficos 2D utilizando navegadores.

Phaser permite crear **juegos responsivos** que pueden ser utilizados desde todo tipo de dispositivos como ordenadores de escritorio, tablets, smartphones etc ya que aprovecha la homogeneidad que ofrecen las tecnologías web.

Incluye varios motores de físicas, animación, renderizado de imágenes, debuger, manejo de entrada/salida, sonido, manejo de cámaras....

##### Comenzar a usar Phaser:

Lo primero será [descargar](https://github.com/photonstorm/phaser/releases/download/v2.4.4/phaser.min.js) Phaser desde su [Github](https://github.com/photonstorm/phaser). Los creadores de Phaser recomiendan aprender a usar el framework mediante ejemplos, también disponen de una [comunidad](http://www.html5gamedevs.com/forum/14-phaser/) donde podemos recibir más ayuda.

Es importante ver los [ejemplos](http://phaser.io/examples) y la [documentación](http://phaser.io/docs/2.4.4/index) que proporcionan en la página de Phaser para entender cómo funciona este framework, sin embargo en este repo haremos un pequeño tutorial utilizando como ejemplo la creación de un juego al estilo _FlappyBird_.

##### Estructura típica de los juegos en Phaser:

Típicamente los juegos en Phaser se _dividen_ en tres funciones principales.

- La función preload(): Que Phaser reconocerá y usará para precargar todo el contenido, es la "zona" donde se indican los recursos externos que vamos a usar durante el juego, imágenes, audio, sprites... 
- La función create(): Es la función que Phaser reconocerá para crear los objetos que deseemos que interactuen en el juego, aquí podremos por ejemplo, definir un sprite con una imagen, una dimensión, unas físicas concretas, en una coordenada concreta etc.
- La función update(): Es el bucle principal del juego, se ejecuta todo el rato, en él deben ponerse los eventos que ocurren dentro del juego.
- La función render(): Se usa sobre todo para debuggin, permite superponer texto en la pantalla del juego, usualmente sirve para superponer coordenadas de un determinado objeto, datos de sus físicas etc.

Veamos un ejemplo básico de la carga y el renderizado de una imagen:

	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Ejemplo', 
		{ preload: preload, create: create });
	function preload() {
	    game.load.image('einstein', 'assets/pics/ra_einstein.png');
	}
	function create() {
	    game.add.sprite(0, 0, 'einstein');
	}
	
Bien, en el código superior observamos varios puntos interesantes. En la línea 1 creamos una instancia del juego y le definimos las dimensiones que va a ocupar. Además definimos que utilice para renderizar un Canvas de JavaScript, le asignamos un nombre y opcionalmente le decimos cómo se llamarán las funciones principales de preload, create, etc. Dentro de la función preload() encontramos la línea **game.load.image('einstein','assets/...');**, esta línea utiliza la función **load.image()** del objeto **game** para cargar una imagen, podríamos haber cargado también un sprite con **load.sprite()** o un conjunto de sprites utilizando **load.spritesheet()**. El objeto Loader es el que permitirá cargar contenido a la memoria.

Continuamos con la función **create()**, como se puede intuir, la línea **game.add.sprite(0, 0, 'einstein');** pintará en la posición (0,0) del eje (x,y) la imagen que habíamos precargado, fíjate que la habíamos llamado _einstein_, así que Phaser la reconoce.

Vamos a complicar un poquito más este código para ver algunas otras funcionalidades importantes, manteniendo la creación del objeto Phaser.Game y de la función preload(), modificamos la función create() para que nos quede de esta forma:

    function create() {
        var image = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        text = game.add.text(250, 16, '', { fill: '#ffffff' });
        image.events.onInputDown.add(listener, this);
    
    }
    
    function listener () {
        counter++;
        text.text = "Has hecho click " + counter + " veces";
    }
    
Podemos observar que hay bastantes cosas nuevas, la primera, ahora creamos una variable que igualamos a game.add.sprite. Esto nos permitirá modificar más cómodamente atributos de la imagen que nos interesa y darle más usos. Como vemos en el ejemplo, **image.anchor.set(0.5)** ancla la imagen a la mitad del mapa (al poner solo un parámetro, Phaser cogerá (0.5,0.5)). La siguiente línea indica que sobre la imagen pueden aplicarse eventos de entrada, es decir, en este caso indica que podemos hacer click sobre ella y que eso tendrá un efecto que ahora veremos. Añadimos un objeto de texto que utilizaremos para ver cuántos clicks se han hecho sobre la imagen, fíjate que sencillo es, tan solo se añaden las cordenadas x é y del texto y luego se le da un estilo **en CSS**. La siguiente línea es la importante, es increible lo fácil que resulta en Phaser añadir eventos a los objetos, en este caso se pone a escuchar un evento de **onInputDown** que viene a ser _cuando me hacen click_ entonces con **.add()** definimos un manejador de evento y también le decimos que se aplique en el entorno del objeto llamado con el puntero this. ¿Sencillo verdad?

##### Los Estados:

Phaser tiene una caracterísitica muy lógica, el manejo de estados. ¿Para qué sirve? Con un ejemplo práctico se entiende perfectamente: Supón que tenemos varios niveles dentro de un juego, sería interesante entonces que cada nivel cargase su mapa cuando pasemos a él y que no se cargue el juego entero de una sola vez. Pues es muy sencillo y gracias a la POO se puede hacer de una forma muy visual.

Phaser tiene un manejador de estados por defecto, para usarlo pondré el siguiente ejemplo que más tarde aplicaremos:

    var nivel = function(game){}
    nivel.prototype = {
        preload: { ... },
        create: { ... },
        update: { ... }
    }
    game.states.add("Nivel 1",nivel);
    game.states.start("Nivel 1");
    
Como puedes comprobar es muy intuitivo, encapsulamos las funciones preload, create y update de un nivel en concreto, lo añadimos al conjunto de estados y luego lo iniciamos. Además dentro de un estado podemos inciar otro estado en un momento dado.


### Taller:

El siguiente taller está pensado para ser realizado en clase siguiendo mis indicaciones, pretende ser sencillo e ir viendo los resultados poco a poco. Partiremos de una plantilla dispuesta en Github a la que le iremos añadiendo cosas para finalmente tener nuestro FlappyBird (con la diferencia de que no nos haremos millonarios).

Link al Github del taller: https://github.com/dreadlocked/TallerPhaserJS/tree/taller

##### Flappy Bird

Clonamos el repositorio en local, utilizaremos **index.html** para ejecutar el juego en el navegador. El index tan solo contiene un par de etiquetas para cargar la librería de Phaser y para cargar el juego en si. He puesto ha disposición también las imagenes que usaremos durante el taller.

El fichero con el que vamos a trabajar es **game.js** que contiene la definición de todo el juego.

FlappyBird consiste en un pequeño pajarito que se mueve hacia adelante y puede volar de una forma un tanto aparatosa, el reto del juego es ir atravesando las tuberías, que tendrán una separación de tamaño fijo pero en disposiciones aleatorias. 

Como podemos comprobar tenemos muchas funciones ya hechas, vamos a explicarlas:

La función flap() (aleteo en inglés) va a definir la fuerza con la que se impulsa el pájaro cada vez que hace un aleteo, se impulsará hacia arriba. En Phaser impulsarse hacia arriba implica ir en dirección opuesta al eje Y, por tanto se impulsa en -y. 

Vemos que se define una clase Pipe (tubería), y que su constructor recibe como argumentos el juego en si, una coordenada X, una coordenada Y , y ojo a esto, recibe también un argumento de velocidad ¿Por qué? Pues porque realmente no es el pájaro quien va a moverse, sino las tuberías, es decir, el mapa es el que se moverá en dirección contraria a la que parece moverse el pájaro, el pájaro pues se mantendrá anclado en una posición X del mapa y solo se movera en la dirección del eje Y. Como vemos Pipe heredará de Sprite, pudiendo así usar todas sus funcionalidades, como por ejemplo la posibilidad de estar sujeto a físicas para poder añadirles una velocidad para que se muevan en el eje X. 

La función update() de Pipe lo que hará será reconocer cuándo la tubería ha salido del mapa, utilizando como datos el ancho del mapa y la coordenada X de la tubería.

La función addPipe() se encargará de crear las tuberías en pares de dos, una tubería superior y una tubería inferior. Además defniriá dónde se situa el agujero que queda entre las dos tuberías haciendo que una quede más arriba y otra más abajo, manteniendo siempre la misma distancia entre ellas para que los agujeros sean uniformes.

La función die() es la que se encarga de resetear el juego, es la función a la que llamaremos siempre que suceda algún evento que signifique perder, lo único que hace es volver a llamar al estado para que se vuelva a incializar todo de nuevo.

**Pasamos a la acción:**
Vamos entonces a completar lo que falta, por orden. Empezando por la función **preload()**:

Si hemos captado la utilidad de esta función, intuiremos que lo que necesitamos añadir aquí serán las imágenes del pájaro y de la tubería. Para el caso que he propuesto tenemos dos opciones, poner una imagen estática o un sprite que se mueva. Para hacer rápido este ejemplo pondremos una imágen estática, sin embargo en la rama master podemos ver comentado como animar al pájaro.

Añadimos pues las líneas:

    game.load.image("bird", "bird.png");
	game.load.image("pipe", "pipe.png");
	
Sencillo. A continuación nos encontramos que la función **create()** tiene algunas líneas ya definidas, esto es para agilizar el tutorial y enseñar las cosas básicas del framework. Lo primero que vemos es la línea **pipeGroup = game.add.group();** Los grupos en Phaser son lo que intuyes, grupos de objetos a los que poder aplicarles físicas, animaciones, sonidos etc. a todos juntos. En nuestro caso lo utilizaremos porque las tuberías van en grupos de dos, una tubería superior y una tubería inferior, en la función **addPipe()** puedes ver cómo se agregan cada una al grupo pipeGroup. Las tres líneas siguientes definen un fondo de color para el juego, una opción que evita que el juego se pause cuando cambiamos de pestaña en el navegador y definimos el conjunto de físicas que vamos a usar, en nuestro caso las físicas Arcade.

Si hemos estado atentos nos daremos cuenta de que falta añadir al juego el sprite del pájaro, pues bien, como hemos visto en los ejemplos anteriores, es bastante sencillo, solo necesitamos poner: 

    bird = game.add.sprite(80,240,"bird");
    
Lo que le indicamos es que queremos que se cree la imagen "bird" en la coordenada (80,240) del mapa.

Ahora que tenemos a nuestro pájaro, estaría bien que se moviera ¿no? Pues vamos a aplicarle físicas entonces:

    game.physics.arcade.enable(bird);
	bird.body.gravity.y = birdGravity;
	
Lo que dicen estas dos líneas es que el objeto al objeto _bird_ se le van a aplicar las físicas que definamos en el juego, existen físicas globales y físicas particulares de cada objeto. Como no nos interesa que las tuberías tengan gravedad, se la aplicamos solo al pájaro con la segunda línea, además indicamos que la gravedad solo le afectará en el eje de las Y.

Vamos a añadirle los eventos de entrada al juego. Si hemos jugado FlappyBird sabemos que lo que se hace para que el pájaro haga un aleteo es pulsar en la pantalla, por cada vez que pulsamos, da un aleteo, así pues es el juego en sí, es decir, el objeto _game_ el que tiene que recibir el evento de click y no el objeto _bird_

    game.input.onDown.add(flap, this);
    
Y ya por último dentro de la función create, necesitamos crear nuestras tuberías, pero atentos, las tuberías tienen que irse creando de forma continua conforme pasa el tiempo, Phaser está preparado para ello y tiene un objeto que se usa mucho, el objeto **Time** que sirve para manejar todo lo referente a tiempo dentro del juego, además, **Time** nos ofrece la opción de **event.loop()** que repite el evento que le pasemos cada equis tiempo:

    game.time.events.loop(pipeInterval, addPipe);
	addPipe();
	
La segunda línea se añade para que al empezar el juego ya exista una tubería creada sin necesidad de esperar el tiempo de pipeInterval. 

Ya tenemos pues las tuberías generándose constantemente y moviéndose hacia la izquierda, lo último que necesitamos pues es hacer que, si el pájaro colisiona con alguna de las tuberías, el juego termine. Para ello nos vamos a la función **update()**

En **update()** añadiremos normalmente las reglas del juego, las cosas a las que el juego debe de estar atento, los eventos que ocurren, la interacción entre los elementos del juego.
El motor de físicas arcade de Phaser nos proporciona un método super útil y ridículamente intuitivo, el método **checkCollide()** que comprueba si dos objetos están colisionando:

    game.physics.arcade.collide(bird, pipeGroup, die);
    
Creo que la línea se explica por si sola, lo que dice es que si dentro del juego, el objeto _bird_ y el objeto _pipeGroup_ (representando a ambas tuberías) chocan, es decir, intentan superponerse uno a otro, entonces se llama a la función **die()**.

Como añadido, el pájaro no debería de poder sobrepasar ninguno de los bordes superior ni inferior del mapa, para ello aplicamos un poco de lógica:

    if((bird.y > game.height) || (bird.y < 0)){
    	die();
    }

Con esto en principio tendríamos listo una versión básica, una estructura del FlappyBird. Ahora podríamos añadir también un contador que se almacene en la caché del navegador para almacenar las puntuaciones etc.












	







