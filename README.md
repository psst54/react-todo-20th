# 2주차 미션: React-Todo

# 결과물

배포 링크 :
[https://react-todo-20th-six.vercel.app/](https://react-todo-20th-six.vercel.app/)

## 기능 구현

- Open, In Progress, Done column별로 목표를 확인할 수 있다.
- 각 Column에서 input field를 통해 새로운 목표를 추가할 수 있다.
- 목표는 X 버튼을 통해서 삭제할 수 있다.
- 목표 내에서 input field를 통해 새로운 할 일을 추가할 수 있다.
- 할 일은 삭제 버튼을 통해서 삭제할 수 있다.
- 할 일 요소의 체크박스틀 통해 할 일을 완료/해제할 수 있다.

# Key Questions

## Virtual-DOM은 무엇이고, 이를 사용함으로서 얻는 이점은 무엇인가요?

**Virtual DOM**은 UI의 **가상**적인 표현이 메모리에 저장되고, 브라우저의 **실제** DOM과 동기화하는 프로그래밍 개념이다.

### 장점

- 브라우저 리소스 절약
  - 실제 DOM을 조작한다면 브라우저에서 render tree 재계산, reflow(레이아웃 재계산), repaint(화면 다시 그리기) 작업이 일어날 수 있기 때문에 리소스가 소모된다.
  - Virtual DOM을 사용한다면 브라우저의 실제 DOM을 조작하기 전에, 메모리상에 존재하는 가상의 DOM을 먼저 조작한 뒤, 변경된 부분만 실제 DOM에 반영한다.
  - 변경 사항이 있을 때 실제 DOM의 모든 부분을 다시 렌더링하지 않고, 변경된 부분만 효율적으로 업데이트할 수 있다.
- 추상화
  - DOM 조작을 직접 하지 않기 때문에 DOM 관련 복잡성을 관리하지 않아도 된다.
  - 기존에는 아래처럼 DOM을 직접 조작해야 했지만,
    ```js
    // 명령형 코드
    if (isActive) {
      document.getElementById('example-element').classList.add('active');
    } else {
      document.getElementById('example-element').classList.remove('active');
    }
    ```
  - Virtual DOM을 사용하면 이처럼 `isActive` 상태를 기반으로 `class`를 적절하게 변경할 수 있다.
    ```js
    // 선언적 코드: React를 이용하는 경우
    const ExampleComponent = ({ isActive }) => {
      return <div className={isActive ? 'active' : 'inactive'}>예시</div>;
    };
    ```

### 과정

가상 DOM을 실제 DOM에 동기화하는 과정을 **재조정(reconciliation)** 이라고 하고, 여러 방법이 있다. React에서는 내부적으로 `ReactDom`이라는 라이브러리를 사용해서 가상 DOM과 실제 DOM을 동기화시킨다. Vanilla JS에서도 Virtual DOM을 이용하고 싶다면 `Snabbdom`같은 라이브러리를 이용할 수 있다.

&nbsp;

재조정은 아래와 같은 방식으로 진행된다.

1. 상태 변경(State Change): 상태가 변경될 때마다 (setState 등을 통해) DOM 트리가 다시 생성된다. 즉, 메모리에는 두 개의 가상 DOM 트리가 동시에 존재하게 된다.

2. 비교(Diffing): 전의 Virtual DOM과 새로운 Virtual DOM을 비교하여 어떤 부분이 변경되었는지 확인한다.

3. 리렌더링(Re-render / Patching): 변경 사항이 실제 DOM에 적용된다. 이때 React는 실제 DOM을 업데이트하는 데 필요한 최소한의 작업 수를 찾아내고, 변경 사항을 한 번에 모아서 처리한다.

## React.memo(), useMemo(), useCallback() 함수로 진행할 수 있는 리액트 렌더링 최적화에 대해 설명해주세요. 다른 방식이 있다면 이에 대한 소개도 좋습니다.

`memo()`, `useMemo()`, `useCallback()` 을 이용하면 컴포넌트의 불필요한 렌더링을 방지함으로써, 성능을 높일 수 있다.

### `memo`

`memo`를 사용하면 컴포넌트의 props가 변경되지 않은 경우, 리렌더링을 건너뛸 수 있다.

React는 일반적으로 부모 컴포넌트가 리렌더링될 때, 자식 컴포넌트도 함께 리렌더링된다. 하지만 자식 컴포넌트로 전달되는 props가 이전과 동일하다면, 자식 컴포넌트는 리렌더링되지 않도록 할 수 있다.

#### 호출

```js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

- `SomeComponent`: 첫 번째 인자로는 메모제이션하고자 하는 컴포넌트를 넘겨준다.
- `arePropsEqual`: 필요한 경우, 두 번째 인자로는 **사용자 정의 비교 함수**를 넘겨줄 수 있다.
  - props가 동일해 리렌더링이 필요하지 않은 경우 `true`를, 아닌 경우 `false`를 반환한다.

#### 주의점

`memo`는 기본적으로 props를 얕은 비교(shallow comparison)로 비교한다. 따라서 객체나 배열을 props로 전달한 경우, 내용이 같더라도 참조가 변경되면 다시 렌더링이 발생할 수 있다.

이런 경우, 위에서 언급한 **사용자 정의 비교 함수**를 통해 이전 배열과 새로운 배열을 비교하도록 정할 수 있다.

### `useMemo`

`useMemo`는 리렌더링 사이에 계산 결과를 캐싱할 수 있게 해주는 React Hook이다.

#### 호출

```js
useMemo(calculateValue, dependencies);
```

- `calculateValue`: 캐싱할 값을 계산하는 함수이다.
  - 초기 렌더링 시에 `calculateValue`함수가 호출된다.
  - 이후 `dependencies`가 변경되지 않았다면 다음 렌더링에서는 `calculateValue` 함수 호출 없이 동일한 값을 반환하도록 값을 저장한다.
- `dependencies`: `calculateValue` 함수 안에서 참조된 모든 값들의 목록이다. 해당 값들이 변경된 경우, 다음 렌더링에서는 새로 `calculateValue` 함수를 호출해 값을 재계산하게 된다.

#### 주의점

- `useMemo`는 Hook이기 때문에 컴포넌트의 최상위 레벨 또는 자체 Hook에서만 호출할 수 있다.
- 복잡한 계산이 있는 경우나 값이 자주 변경되지 않는 경우에 사용하면 좋다.

### `useCallback`

리렌더링 사이에 함수 정의를 캐싱할 수 있게 해주는 React Hook이다.

#### 호출

```js
useCallback(fn, dependencies);
```

- `fn`: 캐싱할 함수이다.
  - 초기 렌더링 시에 `fn` 함수를 반환한다. (호출하는 것은 아니다.)
  - 이후 `dependencies`가 변경되지 않았다면 다음 렌더링에서는 같은 함수를 다시 반환한다.
  - 변경되었다면 함수를 새로 반환하고, 재사용할 수 있도록 저장한다.
- `dependencies`: `fn` 함수 안에서 참조된 모든 값들의 목록이다.

#### 주의점

- `useCallback`는 Hook이기 때문에 컴포넌트의 최상위 레벨 또는 자체 Hook에서만 호출할 수 있다.

## React 컴포넌트 생명주기에 대해서 설명해주세요.

컴포넌트의 생명주기(LifeCycle)이란, 컴포넌트가 생성되고 제거되기까지의 여러 단계를 이른다.

각 생명주이게서는 특정한 메소드가 호출되며, 이러한 메소드들을 오버라이딩할 수도 있다.

### Mouting (생성 단계)

- `constructor`
  - 컴포넌트가 생성될 때 호출되는 생성자 메소드
  - 초기 상태의 설정 및 이벤트 핸들러의 바인딩이 주로 이루어진다.
- `static getDerivedStateFromProps`
  - props로부터 상태를 동기화하기 위해 호출되는 메소드
  - React 16.3부터 도입됨
- `render`
  - 컴포넌트의 UI를 렌더링한다
- `componentDidMount`
  - 컴포넌트가 실제 DOM에 삽입된 후 호출되는 메소드
  - 초기 데이터 로딩 등의 작업에 사용된다.

### Updating (업데이트 단계)

- `static getDerivedStateFromProps`
  - props로부터 상태를 동기화하기 위해 호출된다.
- `shouldComponentUpdate`
  - 컴포넌트의 리렌더링 여부를 결정한다.
- `render`
  - UI를 렌더링한다.
- `getSnapshotBeforeUpdate`
  - 컴포넌트가 업데이트되기 직전에 호출된다.
- `componentDidUpdate`
  - 컴포넌트의 업데이트가 완료된 후 호출된다.

### Unmouting (제거 단계)

- `componentWillUnmount`
  - 컴포넌트가 제거되기 직전에 호출된다.
  - 리소스 정리나 이벤트 해제 등의 작업을 수행한다.

### Error Handling

- `static getDerivedStateFromError`
  - 자식 컴포넌트의 렌더링 중에 오류가 발생했을 때 호출된다.
- `componentDidCatch`
  - 자식 컴포넌트에서 오류가 발생했을 때 호출된다.

함수 컴포넌트에서는 Hook을 이용하여 상태 및 생명주기 기능을 사용할 수 있다.

- `useState`
  - state를 생성한다.
  - 현재 state값과 해당 state를 업데이트할 수 있는 setFunction을 반환한다.
- `useEffect`
  - 함수 컴포넌트에서 부수 효과(side effect)를 수행할 때 사용한다
- `useContext`
  - React의 context를 사용할 때 사용한다. 컴포넌트 트리 전체에서 전역적인 값을 공유할 때 유용하다.
- `useReducer`
  - 복잡한 상태 로직을 효과적으로 관리하기 위해 사용한다.
  - 상태 업데이트 로직을 외부 함수로 분리할 수 있다.
- `useMemo`
  - 계산 비용이 많이 드는 함수의 결과값을 기억한다.
  - 의존성 배열에 있는 값이 변경될 때만 해당 값을 다시 계산한다.
  - 불필요한 연산을 방지하고 성능을 최적화할 수 있다.
- `useCallback`
  - 메모제이션된 콜백 함수를 생성한다.
  - 자식 컴포넌트가 불필요하게 다시 렌더링되는 것을 방지한다.
- `useRef`
  - 상태 업데이트를 트리거하지 않는 값을 생성하거나, DOM 요소에 대한 참조를 생성한다.
- `useLayoutEffect`
  - 렌더링이 발생하기 전에 **동기적**으로 실행된다.
  - 브라우저의 레이아웃을 읽어오고, 그에 따른 사이드 이펙트를 처리한다.

## 참고

- https://legacy.reactjs.org/docs/faq-internals.html
- https://bitsofco.de/understanding-the-virtual-dom/
- https://legacy.reactjs.org/docs/react-dom.html
- https://simsimjae.gitbook.io/simsimreact/snabbdom
- https://medium.com/@priyabratapanda.13/working-of-virtual-dom-in-react-1ad8779fe922
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useMemo
- https://react.dev/reference/react/useCallback#usecallback
- https://legacy.reactjs.org/docs/state-and-lifecycle.html
