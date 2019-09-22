import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../../interfaces/product';
import { Observable, Subject } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  // Updating the Product
  updateForm: FormGroup;
  lname: FormControl;
  lprice: FormControl;
  ldescription: FormControl;
  limageUrl: FormControl;
  lid: FormControl;


  // Add Modal
  @ViewChild('template', { static: false }) modal: TemplateRef<any>;

  // Update Modal
  @ViewChild('editTemplate', { static: false }) editmodal: TemplateRef<any>;


  // Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  selectedProduct: Product;
  products$: Observable<Product[]>;
  products: Product[] = [];
  userRoleStatus: string;


  // Datatables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;



  constructor(private productservice: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private acct: AccountService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.products$ = this.productservice.getProducts();

    this.products$.subscribe(result => {
      this.products = result;

      this.chRef.detectChanges();

      this.dtTrigger.next();
    });

    this.acct.currentUserRole.subscribe(result => { this.userRoleStatus = result; });


    // Modal Message
    this.modalMessage = 'All Fields Are Mandatory';

    // Initializing Add product properties

    const validateImageUrl = '^(https?:\/\/.*\.(?:png|jpg))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.imageUrl = new FormControl('', [Validators.pattern(validateImageUrl)]);

    this.insertForm = this.fb.group({

      name: this.name,
      price: this.price,
      description: this.description,
      imageUrl: this.imageUrl,
      outOfStock: true,

    });

    // Initializing Update Product properties
    this.lname = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.lprice = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.ldescription = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.limageUrl = new FormControl('', [Validators.pattern(validateImageUrl)]);
    this.lid = new FormControl();

    this.updateForm = this.fb.group(
      {
        id: this.lid,
        name: this.lname,
        price: this.lprice,
        description: this.ldescription,
        imageUrl: this.limageUrl,
        outOfStock: true

      });
  }
  onAddProduct() {
    this.modalRef = this.modalService.show(this.modal);
  }
  onSubmit() {
    const newProduct = this.insertForm.value;

    this.productservice.insertProduct(newProduct).subscribe(
      result => {
        this.productservice.clearCache();
        this.products$ = this.productservice.getProducts();

        this.products$.subscribe(newlist => {
          this.products = newlist;
          this.modalRef.hide();
          this.insertForm.reset();
          this.rerender();

        });
        console.log('New Product added');

      },
      error => console.log('Could not add Product')

    );
  }
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }
  onUpdate() {
    const editProduct = this.updateForm.value;
    this.productservice.updateProduct(editProduct.id, editProduct).subscribe(
      result => {
        console.log('Product Updated');
        this.productservice.clearCache();
        this.products$ = this.productservice.getProducts();
        this.products$.subscribe(updatedlist => {
          this.products = updatedlist;

          this.modalRef.hide();
          this.rerender();
        });
      },
      error => console.log('Could Not Update Product')
    );
  }
  onUpdateModal(productEdit: Product): void {
    this.lid.setValue(productEdit.productId);
    this.lname.setValue(productEdit.name);
    this.lprice.setValue(productEdit.price);
    this.ldescription.setValue(productEdit.description);
    this.limageUrl.setValue(productEdit.imageUrl);

    this.updateForm.setValue({
      id: this.lid.value,
      name: this.lname.value,
      price: this.lprice.value,
      description: this.ldescription.value,
      imageUrl: this.limageUrl.value,
      outOfStock: true
    });

    this.modalRef = this.modalService.show(this.editmodal);
  }
  onDelete(product: Product): void {
    this.productservice.deleteProduct(product.productId).subscribe(result => {
      this.productservice.clearCache();
      this.products$ = this.productservice.getProducts();
      this.products$.subscribe(newlist => {
        this.products = newlist;

        this.rerender();
      });
    });
  }
  onSelect(product: Product): void {
    this.selectedProduct = product;

    this.router.navigateByUrl('/products/' + product.productId);
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}
