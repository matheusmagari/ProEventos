/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { NavComponent } from './nav.component'

describe('NavComponent', () => {
  let component: NavComponent
  let fixture: ComponentFixture<NavComponent>

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [NavComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
