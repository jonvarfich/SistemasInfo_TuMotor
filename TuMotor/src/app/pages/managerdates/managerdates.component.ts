import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managerdates',
  templateUrl: './managerdates.component.html',
  styleUrls: ['./managerdates.component.scss'],
})
export class ManagerdatesComponent implements OnInit {
  
  list: any[] = [
    {
      nombre: "Cita1",
      id: 1,
    },
    {
      nombre: "Cita2",
      id: 2,
    },
    {
      nombre: "Cita3",
      id: 3,
    }
  ]
  
  constructor() {}

  ngOnInit(): void {
    const acc_btns = document.querySelectorAll('.accordion-header');
    const acc_contents = document.querySelectorAll('.accordion-body');

    acc_btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        acc_contents.forEach((acc) => {
          if (e.target !== acc && acc.classList.contains('active')) {
            acc.classList.remove('active');
            acc_btns.forEach((btn) => btn.classList.remove('active'));
          }
        });

        const panel = btn.nextElementSibling;
        panel.classList.toggle('active');
        btn.classList.toggle('active');
      });
    });

    window.onclick = (e) => {
      if (!e.target.matches('.accordion-header')) {
        acc_btns.forEach((btn) => btn.classList.remove('active'));
        acc_contents.forEach((acc) => acc.classList.remove('active'));
      }
    };
  }
}
