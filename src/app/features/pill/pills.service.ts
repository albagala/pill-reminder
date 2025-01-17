import { Injectable } from '@angular/core';
import { Pill } from './pill.model';

const PILLS_STORAGE_KEY = 'pills';

@Injectable({
  providedIn: 'root',
})
export class PillsService {
  pillConfig = {
    /** In hours*/
    takeFrequencyHours: 8,
  };
  private pillsTaked: Pill[] = [];

  constructor() {
    this.loadPills();
  }

  takePill() {
    const pill: Pill = new Pill(this.pillConfig);
    this.pillsTaked.unshift(pill);
    this.savePills();
  }

  untakeLastPill() {
    this.pillsTaked.shift();
    this.savePills();
  }

  removePill(pill: Pill) {
    this.pillsTaked = this.pillsTaked.filter(
      (actualPill) => actualPill.timestamp !== pill.timestamp
    );

    this.savePills();
  }

  getLastPill() {
    return [...this.pillsTaked].shift() || null;
  }

  getAllPills() {
    return this.pillsTaked;
  }

  savePills() {
    localStorage.setItem(PILLS_STORAGE_KEY, JSON.stringify(this.pillsTaked));
  }

  private loadPills() {
    const savedPills = localStorage.getItem(PILLS_STORAGE_KEY) || '[]';
    this.pillsTaked = ((JSON.parse(savedPills) as Object[]) || []).map(
      (plainPill) => Object.assign(new Pill(), plainPill)
    );
  }
}
