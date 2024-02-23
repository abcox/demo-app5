import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
  WritableSignal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatRippleModule,
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
})
export class SurveyComponent implements OnInit, OnChanges {
  fb = inject(FormBuilder);
  survey = input.required<Survey>();
  vm!: WritableSignal<ViewModel>;
  selectedQuestion = 0;
  responses: any;
  getSurveyWithFormGroups(survey: Survey): QuestionForm[] {
    const results = survey.questions.map((question, questionIndex) => {
      const formId = `f${questionIndex}`;
      const defaultOptionIndex = question.defaultOptionIndex;
      const formValue =
        question.type === 'select' && defaultOptionIndex !== undefined
          ? defaultOptionIndex
          : -1;
      const fields =
        question.type === 'checkbox'
          ? question.options.map((option, index) => {
              const result = {
                label: `${formId}_c${index}`,
                control: new FormControl(false),
              };
              return result;
            })
          : [
              {
                label: `${formId}_c0`,
                control: new FormControl(formValue),
              },
            ];
      // todo: add support for text input
      // todo: init responses with defaults
      const formFields: any = {};
      fields.forEach(field => {
        formFields[field.label] = field.control;
      });
      const formGroup = this.fb.group({ ...formFields });
      formGroup.valueChanges
        .pipe(
          tap((value: any) => {
            //console.log('value, question', {value, question});
            let response: any = {};
            const responses = Object.keys(value)
              .map((key, index) => {
                const optionIndex =
                  question.type === 'checkbox' ? index : value[key] ?? -1;
                const optionText = question.options[optionIndex].text;
                /* console.log('key, index, optionText', {
                  key,
                  index,
                  optionText,
                }); */
                if (question.type === 'checkbox' && !value[key]) {
                  return null; // skip false values on checkboxes
                }
                return {
                  controlId: key,
                  text: optionText,
                  questionOptionIndex: optionIndex,
                };
              })
              .filter((response: any) => response); // filter out null values
            //console.log('responses', responses);
            response[questionIndex] = {
              responses,
              question,
            };
            //console.log('response', response);
            this.responses = { ...this.responses, ...response };
            //console.log('survey responses', this.responses);
            if (question.type === 'radio') {
              this.next();
            }
          })
        )
        .subscribe();
      const result = {
        ...question,
        name: formId,
        type: question.type,
        formGroup,
        fields /* [field] */,
      };
      //console.log(`result ${questionIndex}`, result);
      return result;
    });
    console.log('survey', results);
    return results;
  }
  ngOnInit() {
    this.initViewModel();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }
  initViewModel() {
    this.responses = undefined;
    this.vm = signal<ViewModel>({
      survey: {
        ...this.survey(),
        forms: this.getSurveyWithFormGroups(this.survey()),
      } as Survey,
    });
    //this.responses = this.getInitResponses(this.survey());
  }
  getInitResponses(survey: Survey) {
    const responses: any = {};
    survey.questions.forEach((question, questionIndex) => {
      const defaultOptionIndex = question.defaultOptionIndex ?? -1;
      if (
        [-1, undefined].includes(defaultOptionIndex) || // no default option
        responses[questionIndex]?.responses?.length > 0 // already has responses
      ) {
        return;
      }
      responses[questionIndex] = {
        responses: [
          {
            controlId: `f${questionIndex}_c0`,
            text: question.options[defaultOptionIndex]?.text ?? undefined,
            questionOptionIndex: defaultOptionIndex,
          },
        ],
        question,
      };
    });
    return responses;
  }
  toggleLinear(survey: Survey) {
    survey.isLinear = !survey.isLinear;
  }
  next(event?: any) {
    event?.preventDefault();
    this.selectedQuestion++;
  }
  previous(event: any) {
    event.preventDefault();
    this.selectedQuestion--;
  }
  submit(event: any) {
    event.preventDefault();
    //console.log('submit');
    const defaultResponses = this.getInitResponses(this.survey());
    this.responses = { ...defaultResponses, ...this.responses };
    console.log('survey responses', this.responses);
  }
  reset(event: any) {
    event.preventDefault();
    console.log('reset');
    this.selectedQuestion = 0;
    this.initViewModel();
  }
}

export interface ViewModel {
  survey: Survey;
}

export interface Survey {
  description: string;
  //formGroup?: FormGroup;
  forms?: QuestionForm[];
  fields?: QuestionControl[];
  id: string;
  isLinear: boolean;
  name: string;
  questions: Question[];
  title: string;
  footnote?: string; // 'This is a preliminary survey.'
}

export interface Question {
  id: number;
  text: string;
  name?: string;
  note?: string;
  options: Option[];
  type?: 'checkbox' | 'select' | 'radio' | 'text';
  field?: QuestionField;
  defaultOptionIndex?: number | undefined;
}

export interface QuestionField {
  label: string;
  placeholder: string;
  type: 'text' | 'select';
  options?: string[];
}

export interface QuestionControl extends QuestionField {
  control: FormControl;
}

export interface QuestionForm extends Question {
  //formControl: FormControl;
  formGroup: FormGroup;
}

interface Option {
  id: number;
  text: string;
  footnote?: string; // 'This is a preliminary question to understand your current experience, and you will be given more opportunity to provide details at a later time.'
  // Suggest to bring marketing in the form of explaining the value or benefits of the service. For example:
  // [Name of service] is a service that helps you [value proposition]. We want to make sure we are providing the best service possible, and we need your help to do that. Please take a few minutes to answer the following questions to help us understand your needs and preferences.
  // [Name of service] has more than 34,000 licensed professionals who are ready to help you with your [value proposition]. We want to make sure we are providing the best service possible, and we need your help to do that. Please take a few minutes to answer the following questions to help us understand your needs and preferences.
  // [Name of service] has more than 34,000 licensed and vetted professional therapists with different techniques and approaches.
  question?: Question;
  provideInput?: boolean;
}
