<?php

namespace AppBundle\Controller;

use AppBundle\Entity\LearningLanguage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/friends")
 */
class FriendsController extends Controller
{
    /**
     * @Route("/", name="friends")
     */
    public function indexAction(Request $request)
    {
        $repo = $this->getDoctrine()->getManager()->getRepository('AppBundle:User');
        $users = $repo->findAll();

        return $this->render(':default:friends.html.twig', [
            'users' => $users
        ]);
    }


}