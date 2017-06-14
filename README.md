                        ### UML
Onderstaand is een UML te vinden.

![UML](Game UML version 2.png?raw=true "UML")


hallo best code reviewer,

Instalatie is simpel. Het is typescript dus heb een compiler en een browser en klaar.

Implementaties van de Eisen:

Klassendiagram:
De klassen diagram is hierboven te vinden, ook staat de oude klassendiagram uit week 4 als bestand op git.

Encapulation:
Is bijna overal te vinden namelijk elke functie of variabele is Public of Private

Composition (has a relatie): 
Is te vinden in bijvoorbeeld Game en gameObject waar gameObject niet kan bestaan zonder Game

Inheritance (is a relatie):
Is bijvoorbeeld te vinden in gameObject en Supporter, Supporter is namelijk een gameObject. Dit geld ook voor Bottle en Policeman.

Singleton:
Singleton is te vinden aan het begin van de Game Class

Stratagy:
Stratagy is te vinden in Supporter, waarbij Supporter 2 gedragingen kan hebben: Moving en Throwing. Moving en Throwing implementeren allebij SupporterBehavior.

Observer:
Observer is te vinden bij Supporter en Policeman, hier is Supporter het Subject en Policeman de Observer. Policeman krijgt een melding als de Supporter zijn Throwing Behavior uitvoerd. dan gaat hij sneller bewegen.

Interface:
Interfaces worden gebruikt bij Observer en Stratagy: SupporterBehavior, PoliceBehavior, Subject en Observer.

Static:
Static komt terug in singleton 

Abstract:
De class GameObject is een Abstract class

Namespaces:
Namespaces komt terug in Bottle, voor het geval er later meerdere bottles nodig zijn met verschillende effecten en ik ze dezelfde naam wil geven.

Polymorphism:
Polymorphism komt meerdere keren terug bijvoorbeeld bij de keyBoardEvents.

Enumerations:
Bovenaan de class Policeman wordt de enumeration isDead gemaakt, deze wordt gebruikt om duidelijker aan te geven of de agent dood is of niet.

Game loop:
De Game loop is te vinden in Game

Library:
De Library die gebruik is Isomer, deze gebruik ik om leuke cubesjes te maken om aan te geven hoeveel ammo er nog is.

-Doel van het spel-

Als speler speel je straks een supporter ( geen goede plaatjes kunnen vinden) en nadat je club een wedstijd verliest ben je boos en ga je de straat op om bier te gooien naar de politie (as one would nomaly do).

Je moet blijven drinken om je "ammo" aangevult te houden en kan natuurlijk niet gooien/lopen tijdens het drinken.
En natuulijk ook niet drinken/lopen tijdens het gooien of drinken/gooien tijdens het lopen.

Ieder fles die je raak gooit maakt een agent bewusteloos(dood is een beetje overdreven) en het is de bedoeling dat er geen agent dichtbij genoeg komt om je te aresteren.

