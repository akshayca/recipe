"use strict";

// react bootstrap components
var _ReactBootstrap = ReactBootstrap;
var Accordion = _ReactBootstrap.Accordion;
var Panel = _ReactBootstrap.Panel;
var Button = _ReactBootstrap.Button;
var Modal = _ReactBootstrap.Modal;
var Form = _ReactBootstrap.Form;
var FormGroup = _ReactBootstrap.FormGroup;
var FormControl = _ReactBootstrap.FormControl;
var ControlLabel = _ReactBootstrap.ControlLabel;

var initialRecipes = [{
  name: "Spaghetti",
  ingredients: ["pasta", "meatballs"],
  img: "https://c2.staticflickr.com/6/5148/5685365844_8094b0b7cc.jpg",
  directions: "boil water throw spaghetti in it."
}, {
  name: "Roast",
  ingredients: ["meat"],
  img: "https://c1.staticflickr.com/3/2487/4125840965_972935225e_z.jpg",
  directions: "cook meat."
}];
// component delete recipe from array
var DeleteButton = React.createClass({
  displayName: "DeleteButton",

  deleteOnClick: function deleteOnClick() {
    var allRecipesClone = this.props.recipeList;
    allRecipesClone.splice(this.props.i, 1);
    this.setState({
      allRecipes: allRecipesClone
    });
    localStorage.allRecipes = JSON.stringify(allRecipesClone);
  },
  render: function render() {
    return React.createElement(
      Button,
      { bsSize: "small", bsStyle: "danger", onClick: this.deleteOnClick },
      "Delete"
    );
  }
});

// map and list ringredients
var IngredientList = React.createClass({
  displayName: "IngredientList",

  render: function render() {
    return React.createElement(
      "ul",
      null,
      this.props.ingredients.map(function (ingredients, k) {
        return React.createElement(
          "li",
          { key: k },
          " ",
          ingredients,
          " "
        );
      })
    );
  }
});

var RecipeBox = React.createClass({
  displayName: "RecipeBox",

  getInitialState: function getInitialState() {
    return {
      allRecipes: [],
      showEditModal: false,
      showNewModal: false
    };
  }, // store in localStorage
  componentDidMount: function componentDidMount() {
    var storedRecipes = localStorage.allRecipes;
    if (storedRecipes) {
      this.setState({
        allRecipes: JSON.parse(storedRecipes)
      });
    } else {
      this.setState({
        allRecipes: initialRecipes
      });
      localStorage.allRecipes = JSON.stringify(initialRecipes);
    }
  },
  // delete button func
  deleteOnClick: function deleteOnClick(i) {
    var allRecipesClone = this.state.allRecipes;
    allRecipesClone.splice(i, 1);
    this.setState({
      allRecipes: allRecipesClone
    });
    localStorage.allRecipes = JSON.stringify(allRecipesClone);
  },
  // Modal for new recipe
  closeNewModal: function closeNewModal() {
    this.setState({ showNewModal: false });
  },
  openNewModal: function openNewModal() {
    this.setState({ showNewModal: true });
  },
  confirmNewModal: function confirmNewModal() {
    var newRecipe = {};
    var allRecipesClone = this.state.allRecipes;
    newRecipe.name = ReactDOM.findDOMNode(this.refs.newRecipeName).value;
    newRecipe.ingredients = ReactDOM.findDOMNode(this.refs.newRecipeIngredients).value.trim().split(",");
    newRecipe.img = ReactDOM.findDOMNode(this.refs.newRecipeImg).value;
    newRecipe.directions = ReactDOM.findDOMNode(this.refs.newRecipeDirections).value;
    allRecipesClone.push(newRecipe);
    this.setState({
      allRecipes: allRecipesClone,
      showNewModal: false
    });
    localStorage.allRecipes = JSON.stringify(allRecipesClone);
  },

  // Modal for edit recipe
  closeEditModal: function closeEditModal() {
    this.setState({ showEditModal: false });
  },
  openEditModal: function openEditModal(i) {
    // display [i] list on EditModal   
    this.setState({
      showEditModal: true,
      editName: this.state.allRecipes[i].name,
      editIngredients: this.state.allRecipes[i].ingredients,
      editImg: this.state.allRecipes[i].img,
      editDirections: this.state.allRecipes[i].directions,
      editIndex: i
    });
  },

  editModal: function editModal(i) {
    // get values from inputs on NewModal
    var editedRecipeList = this.state.allRecipes;
    editedRecipeList[i].name = ReactDOM.findDOMNode(this.refs.recipeName).value;
    editedRecipeList[i].ingredients = ReactDOM.findDOMNode(this.refs.recipeIngredients).value.trim().split(",");
    editedRecipeList[i].img = ReactDOM.findDOMNode(this.refs.recipeImg).value;
    editedRecipeList[i].directions = ReactDOM.findDOMNode(this.refs.recipeDirections).value;
    this.setState({
      allRecipes: editedRecipeList,
      showEditModal: false
    });
    localStorage.allRecipes = JSON.stringify(editedRecipeList);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "box" },
      React.createElement(
        "div",
        { className: "header" },
        "Recipe Book"
      ),
      this.state.allRecipes.map(function (recipe, i) {
        return React.createElement(
          Accordion,
          null,
          React.createElement(
            Panel,
            { className: "list-item", header: recipe.name, key: i + 1, eventKey: i + 1 },
            React.createElement("img", { src: recipe.img }),
            "INGREDIENTS",
            React.createElement("br", null),
            React.createElement(IngredientList, { ingredients: recipe.ingredients }),
            React.createElement(
              "p",
              null,
              "DIRECTIONS"
            ),
            React.createElement(
              "h4",
              null,
              recipe.directions
            ),
            React.createElement(
              Button,
              { bsSize: "small", bsStyle: "danger",
                onClick: this.deleteOnClick.bind(null, i) },
              "Delete"
            ),
            React.createElement(
              Button,
              { bsSize: "small", bsStyle: "info",
                onClick: this.openEditModal.bind(null, i) },
              "Edit"
            ),
            React.createElement(
              Modal,
              { show: this.state.showEditModal, onHide: this.closeEditModal },
              React.createElement(
                Form,
                null,
                React.createElement(
                  FormGroup,
                  null,
                  React.createElement(
                    ControlLabel,
                    null,
                    "Recipe Name"
                  ),
                  React.createElement(FormControl, { type: "text", defaultValue: this.state.editName, ref: "recipeName" }),
                  React.createElement("br", null),
                  React.createElement(
                    ControlLabel,
                    null,
                    "Ingredients"
                  ),
                  React.createElement(FormControl, { type: "text", defaultValue: this.state.editIngredients, ref: "recipeIngredients" }),
                  React.createElement("br", null),
                  React.createElement(
                    ControlLabel,
                    null,
                    "Image Url"
                  ),
                  React.createElement(FormControl, { type: "text", defaultValue: this.state.editImg, ref: "recipeImg" }),
                  React.createElement("br", null),
                  React.createElement(
                    ControlLabel,
                    null,
                    "Directions"
                  ),
                  React.createElement(FormControl, { type: "text", defaultValue: this.state.editDirections, ref: "recipeDirections" })
                )
              ),
              React.createElement(
                Button,
                { bsSize: "medium", bsStyle: "danger",
                  onClick: this.closeEditModal },
                "Close"
              ),
              React.createElement(
                Button,
                { bsSize: "medium", bsStyle: "primary",
                  onClick: this.editModal.bind(null, this.state.editIndex) },
                "Modify"
              )
            )
          )
        );
      }.bind(this)),
      React.createElement(
        "div",
        { className: "footer" },
        React.createElement(
          Button,
          { className: "addRecipe", onClick: this.openNewModal.bind(null), bsStyle: "success" },
          "Add Recipe"
        ),
        React.createElement(
          Modal,
          { show: this.state.showNewModal, onHide: this.closeNewModal },
          React.createElement(
            Form,
            null,
            React.createElement(
              FormGroup,
              null,
              React.createElement(
                ControlLabel,
                null,
                "Recipe Name"
              ),
              React.createElement(FormControl, { type: "text", ref: "newRecipeName", placeholder: "Be creative!" }),
              React.createElement("br", null),
              React.createElement(
                ControlLabel,
                null,
                "Ingredients"
              ),
              React.createElement(FormControl, { type: "text", ref: "newRecipeIngredients", placeholder: "ingredients separated by commas" }),
              React.createElement("br", null),
              React.createElement(
                ControlLabel,
                null,
                "Image Url"
              ),
              React.createElement(FormControl, { type: "text", ref: "newRecipeImg", placeholder: "www.myWebsite.com/myImage.jpg" }),
              React.createElement("br", null),
              React.createElement(
                ControlLabel,
                null,
                "Directions"
              ),
              React.createElement(FormControl, { type: "text", ref: "newRecipeDirections", placeholder: "How to" })
            )
          ),
          React.createElement(
            Button,
            { bsSize: "medium", bsStyle: "danger",
              onClick: this.closeNewModal },
            "Close"
          ),
          React.createElement(
            Button,
            { bsSize: "medium", bsStyle: "primary",
              onClick: this.confirmNewModal.bind(null) },
            "Done"
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('app'));