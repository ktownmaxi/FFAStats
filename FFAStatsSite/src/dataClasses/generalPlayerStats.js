class GeneralPlayerStats {
    // Private Felder
    #playerId;
    #xp;
    #kills;
    #deaths;
    #currentKillStreak;
    #highestKillStreak;
    #bounty;

    constructor(data) {
        this.#playerId = data.playerId;
        this.#xp = data.xp;
        this.#kills = data.kills;
        this.#deaths = data.deaths;
        this.#currentKillStreak = data.currentKillStreak;
        this.#highestKillStreak = data.highestKillStreak;
        this.#bounty = data.bounty;
    }

    // Getter-Methoden
    get playerId() {
        return this.#playerId;
    }

    get xp() {
        return this.#xp;
    }

    get kills() {
        return this.#kills;
    }

    get deaths() {
        return this.#deaths;
    }

    get currentKillStreak() {
        return this.#currentKillStreak;
    }

    get highestKillStreak() {
        return this.#highestKillStreak;
    }

    get bounty() {
        return this.#bounty;
    }

    // Setter-Methoden
    set playerId(value) {
        this.#playerId = value;
    }

    set xp(value) {
        this.#xp = value;
    }

    set kills(value) {
        this.#kills = value;
    }

    set deaths(value) {
        this.#deaths = value;
    }

    set currentKillStreak(value) {
        this.#currentKillStreak = value;
    }

    set highestKillStreak(value) {
        this.#highestKillStreak = value;
    }

    set bounty(value) {
        this.#bounty = value;
    }

    toString() {
        return `Player ID: ${this.#playerId}\nXP: ${this.#xp}\nKills: ${this.#kills}\nDeaths: ${this.#deaths}\nCurrent Kill Streak: ${this.#currentKillStreak}\nHighest Kill Streak: ${this.#highestKillStreak}\nBounty: ${this.#bounty}`;
    }

    toJSON() {
        return {
            playerId: this.#playerId,
            xp: this.#xp,
            kills: this.#kills,
            deaths: this.#deaths,
            currentKillStreak: this.#currentKillStreak,
            highestKillStreak: this.#highestKillStreak,
            bounty: this.#bounty
        };
    }
}

export default GeneralPlayerStats;