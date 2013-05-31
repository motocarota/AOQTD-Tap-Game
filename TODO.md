# [AOQTD Tap Game](http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo tower defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

Ogni nemico ucciso da punti esperienza, e ha una percentuale di lasciar cadere oggetti utili
	pozioni
	pergamene
	monete

Domanda:

Come implemento i duelli di magia?


## TODO
* fare disegni e note per i livelli ed i mostri da dare poi a meky e alla Cla

(SPELL)
* fare in modo di applicare gli effetti anche tramite travel, se sono definiti
* sistemare le rotazioni delle esplosioni
* impostare lo z-index dei nemici = director.height - y
* applicare il trattamento ricevuto dal spell anche a drop ed enemy (base data)
* creare scene
	- intro screen (play info about)
	- level list
	- game scene
	- info
	- about

* studiare bene una UI
	pausa px mo hp mp spells e BANNER :D

* creare 
	incantesimi
	mostri

* Tabelle dei nemici da generare
	- Timer che genera i nemici in base al livello di gioco
		a fine ciclo crea il boss
		
* pensare a come implementare il boss fight
	(sd2 giu' dall'albero, il mago avversario di fronte che si muove, lancia incantesimi, evoca mostri)
* Creare sprites animati (superdrow, incantesimi, nemici)
* Suoni
* Musica

## DOPO

* Versionare il codice
* Documentare il codice
* Riogranizzare il codice in modo da avere la seguente gerarchia

	Actor
		Entity
			Player
			Enemy
			Spell
			Drop
	
* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )

## LISTA SCENE

* welcome 	[ levels, options ]
* options 	[ welcome ]
* levels 	[ game, welcome ]
* game 		[ pause, levels ]
* pause 	[ game, levels ]

## LISTA OGGETTI

* monete
* pozioni
* pergamene
* bacchette
* gold (cosa ci si compra?)

## LISTA INCANTESIMI

Livello 1
	* Dardo incantato
	* Sonno
	* Paura

Livello 2
	* Raggio infuocato
	* Unto
	* Charme

Livello 3
	* Palla di Fuoco
	* Confusione
	* Evoca mostri

Livello 4
	* Muro di pietra
	* Tempesta di ghiaccio
	* Velocita'

Livello 5
	* Dito della morte
	* Dominare Mostri
	* Catena di Fulmini

## LISTA MOSTRI

* Coboldo
* Goblin
* Scheletro
* Orco
* Zombie
* Mummia
	
##	Bestiario

						stand	walk	attack		damage		die
	Kobold
	Goblin
	Orco
	Troll

	zombie
	scheletro
	ghoul
	mummia
	vampiro

	cubo gelatinoso
	rakshaaza
	hill giant
	golem
	dragon
	giant turtle
	beholder
	blink dog
	shadow
	minotauro
	luci fatue

## LISTA LIVELLI

	* Campagna
	* Locanda / Arena
	* Bosco Fatato
	* Cava del Drago
	* Torre del mago
	* Vulcano
	* Piano Astrale

## BOSS	

	* Lich : Superbia ( viola )
		desiderio irrefrenabile di essere superiori, fino al disprezzo di ordini, leggi, rispetto altrui
		- Piano Astrale / tutto assurdo e fuori dal tempo

	* Drago : Avarizia ( azzurro )
		scarsa disponibilità a spendere e a donare ciò che si possiede
		- Tana del drago / Grotta con diamanti azzurri sulle pareti di roccia

	* Elfo Mago/Beholder : Invidia ( blu )
		tristezza per il bene altrui, percepito come male proprio
		- Torre del mago / Librerie, corridoi

	* Stregone (fuoco) : Ira ( rosso )
		irrefrenabile desiderio di vendicare violentemente un torto subito
		- Piano elementale del fuoco / Vulcani in eruzione, magma e roccia bruciata

	* Ninfa Druida : Lussuria ( giallo )
		desiderio irrefrenabile del piacere sessuale fine a sé stesso
		- Bosco fatato / Fitta vegetazione, sberluccichi luminosi strani, rovine tipo greche

	* Chierico Nano : Gola ( arancione )
		meglio conosciuta come ingordigia, abbandono ed esagerazione nei piaceri della tavola, e non solo
		- Citta' / strade, locanda, arena

	* Gnomo Bardo : Accidia ( verde )
		torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- Greenhill / Campagna, colline e pianure irlandesi

## BUGS

* Fare in modo di lasciare l'etichetta dei danni se il nemico muore
* Capire perche' mi viene creato a troie un nuovo incantesimo 