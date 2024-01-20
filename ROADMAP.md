# Overview

## Description

Cyberiada is an idle cyberpunk-themed RPG inspired by Bitburner. In this game player control crew of up to 10 members by giving them various orders to perform. Crew can travel between different cities which have different conditions and unique rewards.

## Terms

### Money

Money is a resource which can be spend on performing various actions such as completing searches faster, hiring new crew members, buying equipment, boosters and augmentations etc. Later in a game can be converted to credibility.

### Credibility

Credibility is a main resource in the game. It show how much progress is done in particaluar city. Unlocking equipment, boosters, augmentations, works, contracts, missions etc. requires reaching certain levels of credibility. Once all rewards are exhausted, credibility will give attributes and skills points.

### Wanted level

Wanted level is modifier to all requirements, experience and credibility gains. It allows higher rewards at cost of making actions harder to perform. 

Unavailable in beginning, can be unlocked in specific city.

### Difficulty level

Difficulty level depends on city and how much progess is done here. Higher difficulty levels leads to higher requirements but also to higher credibility and experience gains. Difficulty level increases after reaching certain credibility thresholds. Difficulty level is **not** reset by relocating.

### Qualities

Various objects have different quality. Currently available qualities:
- Abysmal
- Bad
- Mediocre
- Average
- Cool
- Good
- Excellent

### Crew

Game revolves around managing crew. Crew members is managed by giving them orders. Various orders have different priorities, in order from most urgent to least: improvements, missions, contracts, side jobs.

Moving to another city will result in losing current crew but certain favor can allow to retain crew members.

If all crew members are lost, crew will restart in starting city but previously unlocked features will remain unlocked.

### Crew member

Each crew member has their own set of attributes, skills, equipment and augmentations. They can be boosted by boosters. Certain actions can kill them. To hire new crew members, special actions should be perform to find and hire new one with money. Depending on quality, crew members have different starting equipment, augmentations, attributes and skills. Attributes and skills cannot be above difficulty level.

### Stats

#### Level

Each crew member has their own level. Level requirements do no depend on current city or difficulty level and are exponential. Reacing new level gives crew member one attribute and one skill points.

#### Experience

To get new levels, crew members must reach certain thresholds of experience. Experience gain can be increased by increasing intellect and using certain items.

#### HP

HP indicates how much damage can crew member take. If HP reaches 0 or lower, crew member dies, to be removed from crew and all actions related to him are cancelled. Can be increased by certain items and endurance.

#### Damage

Damage is used in combat. Each time someone receives a hit, damage is selected from certain range, reduced by opponent defense and then applied. Damage depends on equipment.

#### Critical rate

Each time damage is dealt, it may deal critical hit. Critical rate indicates how often these critical hits happen. Critical rate bonuses depend on equipped weapon, attributes and skills.

#### Critical multiplier

Whenever critical hit happens, damage is multiplied by critical multiplier. Multiplier depends on equipment.

#### Defense

This parameter reduces all incoming damage. Depends on equipment.

#### Hit number

This parameter affects how many attacks will be dealt per turn. Can be increased by agility.

#### Dodge

This parameters affects how it's likely to dodge the attack. Can be increased by stealth and agility.

### Attributes

#### Strength

Strength is used mostly in weapon requirements and for critical rate bonuses for melee weapons.

#### Endurance

Endurance affects crew member HP and how fast augmentations can be installed in them.

#### Perception

Perception is used in determining whether opponent is hit or not. It's another usage is for critical rate bonuses.

#### Agility

Agility is used for dodging attacks and increasing hits number in combat.

#### Intellect

Intellect affects how much experience crew member gets after completing orders. It also used in weapon requirements, for decreasing search requirements.

#### Charisma

Charisma gives bonuses related to money and credibility.

### Skills

#### Close combat

Close combat affects critical rate for close combat weapons such as knifes and SMGs.

#### Ranged combat

Ranged combat affects critical rate for ranged combat weapons such as assault and sniper rifles.

#### Stealth

Stealth is used for dodging attacks.

#### Hacking

Hacking is used for hacking and using smart weapons such as mechs and combat drones.

#### Crafting

Crafting is used for crafting and using complex equipment such as power armor and mechs.

#### Persuasion

Persuasion gives additional money and credibility bonuses.

#### Info gathering

Info gathering affects searches times.

### Equipment

Each crew member has three different equipment slots: weapon, armor and utility. Weapon equipment deals damage, armor provides defense and utility gives buffs. Each equipment item has level and quality. Higher the level or quality, higher the requirements and stats. Equipment can be switched instantly without interrupting current order if crew member is not in combat or in hacking. It can be bought from weapon shop or be crafted. Some equipments are faction-specific and require crafting or capturing weapon shop district for faction.

Equipment will be lost after moving to another city unless specific favors are earned.

Unavailable in beginning, can be unlocked in specific city.

### Augmentations

Augmentations are another way to buff crew members. Like equipment, each augmentation has level and quality, which affect requirements and stats. Unlike equipment, augmentations cannot be switched instantly, instead each augmentation has time wall to install which can be reduced by endurance. Augmentations are installed in hospitals.

Each crew member has following augmentations slots:
- Skin
- Nerve system
- Eyes
- Head
- Torso
- Arms
- Legs

Augmentations are not affected by moving to another city.

Unavailable in beginning, can be unlocked in specific city.

### Boosters

Boosters give buffs and debuffs for limited amount of time. Must be applied manually, cannot be applied in combat or in hacking, application happens instantly. Each booster has level and quality affecting it's stats.

Unavailable in beginning, can be unlocked in specific city.

### Inventory

Inventory has equipment and boosters which can be sold for money. Inventory space is limited. After relocating inventory will be emptied.

### Crafting blueprints

Crafting blueprints allows crafting equipment or boosters. Level of resulting item is limited by level of crafting. Quality can be selected and will affect crafting time, but crafting level can decrease it.

Crafting rectipes are unlocked in specific city by repeated runs.

### City

Each city is described as square map of 100x100 cells. City is divided into districts. Each district may have it's own one main facility: weapon shop, pharmacy, hospital, faction HQ, player HQ or training facility. In addition, each district has it's own multipliers to requirements and gain multipliers.

Each city has it's own line of rewards, each reward requires increasing amount of credibility. These rewards are **not** reset after revisiting city with one exception.

### Facilities

Weapon shop, pharmacy, hostpitals and training facilities have quality. Shops can sell items limited by quality. Training facilities can increase skill or attribute to level depending on difficulty level and quality. Quality can be increased by working for them.

Training facilities can increase only one selected attribute or skill.

### Factions

Each city has it's own set factions that try to claim city for themself. Player can join one faction if credibility requirements are met. Once faction is joined, player cannot leave it unless they relocate.

Each faction HQ has physical and virtual bank accounts so they can be robbed in specific missions.

Faction specific equipment, boosters and blueprints can be achieved by doing certain missions or by participating in turf war.

Player can control faction HQ by performing certain missions, allowing manual district capture and moving money from their accounts.

### Turf war

Turf war allows factions capture districts depending on faction power level. Depending on what has been captured, faction will receive different bonuses:

- Capturing weapon shops, pharmacies and hospitals unlock faction specific items in these facilities
- Capturing training facilities will give substantial discount for faction members
- Capturing opposing faction HQ will prevent it from capturing additional districts
- Capturing player HQ will prevent player crew from operating in different districts

Capturing districts allows crew to perform faction-specific activities here.

Requirements to capture will increase with each owned distict. Player can assist their selected faction by increase it's power level or decrease power levels of it's opponents by performing certain orders.

If district is controlled by faction that is opposing to player, player cannot use this district and it's facility.

By default, turf war is disabled and can be enabled by finishing specific city. Initially, all districts with factions HQs are belong to their factions, other districts are neutral.

### Retaliations

Performing certain actions will trigger retaliations. Amount of retaliations that are about to happen is limited. Retaliations can have different quality, requiring different stats to locate it. Before retaliation happens, certain large amount of time should pass, allowing player to find it. After retaliation is found out, a mission can be assigned to deal with it.

By default, retaliations are disabled and can be enabled by finishing specific city.

#### Hunting party

Hunting party will kill one of player crew member.

#### Raid

Raid will reduce player money and some items from inventory will be lost.

#### Defamation

Defamation will reduce player credibility.

#### Assault

Assault will target player faction and reduce it's power level.

#### Hacking

Hacking will affect player server and programs.

### Relocation

Relocation is the prestige. After relocating, almost everything but one crew member will be lost. Certain favors allow to keep money, credibility, crew members and their equipment at a price or by earning credibility rewards repeatedly.

### Orders

All orders that require searches, can have their searches paid. It allows to finish it instantly.

Once hacking is unlocked, searches can be performed with programs instead.

If order has hacking or combat, it is time limited instead of time walled.

#### Side jobs

Side jobs are basic orders. Each side job consists of two phases. First, one crew member will perform the search. After search is done, one crew member, maybe the same, will perform the work. Side jobs don't have time limit, always depend on one performer, have lowest requirements and will give rewards immediately, without time walling. On other hand, side jobs have weakest multipliers. They are useful in the beginning of game and when contracts are blocked by search.

Quality increases search time, requirements and gains.

#### Contracts

Main way to gain resources. Each contract consists of two phases. First, one crew member will perform the search. After that, team will perform the work. Unlike side jobs, contracts require some time, combat or hacking to be finished first and can be done one time only. Performance bonuses are summed from all team members for contract. Contracts require 2-5 members and unlocked once crew has 2 or more members.

Quality increases search time, requirements and gains.

#### Missions

Missions affect map and global state. Each missions consists of two phases. First, one crew member will perform search. After that, team perform the work. Missions work like contracts, but once mission objective is done, they cannot be retried. Missions may require up to 10 members and are unlocked in specific cities.

Quality increases search time and gains and decreases requirements.

#### Augmenting

Augmenting will install augmentations in selected crew member. After installing augmentations, crew member will be in recovery for sum of every augmentation recovery time. During recovery, crew member is unable to work, re-equip, apply boosters and cannot be assigned to work.

#### Training

Training will increase skill or attribute by one depending on which facility is used for selected crew member. For each increase, price will increase exponentially. Training won't be started unless it can be paid fully. In addition, each increase require small amount of time. Depending on facility quality, limit for training can be increased.

#### Scouting

Scouting will locate incoming retaliations. Scouting is assigned on one crew member. Scouting quality allows to location retaliations with same or lower quality. Quality will also increase time spent on search.

### Combat

Specific orders require combat to finish. These orders have bosses with combat stats. Each second turn occurs, during which remaining team members and boss will exchange hits. Team members will attack first. Once boss HP is equal or lower than 0, combat is passed. After that, order will checked if it's requirements are still passable. If yes, then order is completed. Combat allows finishing orders faster at cost of potential crew loss.

To prevent combat from dragging, it also has time limit.

Combat is unavailable initially, unlocking it requires finishing specific city.

### Server

Player can purchase server for running programs. Server has three parameters:

- Level increases perfomance of running programs
- RAM allows to store more and larger programs
- Cores allow to run more programs simultaneously

Server is unavailable initially, unlocking it requires finishing specific city.

### Programs

Programs allow to perform some actions automatically without crew member input. Each program must be written first by crew member, program level depends on crew member hacking level. Programs also have quality and higher quality leads to higher production time.

Programs are unavailable initially, unlocking them requires finishing specific city.

To prevent wasting resources, special program can be purchased/made to generate money depending on unused RAM/cores.

### Hacking

Specific orders require hacking to finish. Hacking requires filling specific scale within time limit while hacking program is active. After that, order will continue as usual.
